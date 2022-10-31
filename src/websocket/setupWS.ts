import { wss } from '../index';
import { getConnectedUserIds } from './utilsWS';
import UserService from '../services/user.service';
import { ClientInfo, WebSocketClientInfo } from './types';
import websocketFunctions from './websocketFunctions';
import { verify } from 'jsonwebtoken';
import KEYS from '../config/keys';
import { AuthInfo } from '../models/authInfo.model';

const ping = setInterval(() => {
  wss.clients.forEach(function each(ws) {
    if (ws.info.alive === false) {
      ws.terminate();
      return;
    }

    ws.info.alive = false;
    ws.ping(() => { return; });
  });
}, 30000); // 30 seconds

const updateDB = setInterval(() => {
  const connected = getConnectedUserIds();
  UserService.setStatuses(connected);
}, 600000); // 10 minutes

// TODO document
async function loginWSClient(client: WebSocketClientInfo, command: any) {
  if (typeof command.jwt !== 'string') {
    return;
  }
  const data = verify(command.jwt, KEYS.JWT_TOKEN_SECRET) as {
    uuid: string,
  };

  const user = await UserService.findUserByUuid(data.uuid);
  if (user !== null)
    client.info.authInfo = new AuthInfo(user);
}

export function initWebSocket(): void {
  wss.on('connection', (ws: WebSocketClientInfo): void => {
    ws.info = new ClientInfo();

    ws.on('message', async (msg) => {
      try {
        const data = JSON.parse(msg.toString());


        if (ws.info.authInfo === null) {
          await loginWSClient(ws, data);
          return;
        }

        if (typeof data.command !== 'string') {
          return;
        }

        if (data.command in websocketFunctions) {
          websocketFunctions[data.command](ws, data);
        }

      } catch (e) {
        console.error(e);
      }
    });

    ws.on('pong', () => {
      ws.info.alive = true;
    });

  });

  wss.on('close', () => {
    console.log('Closed');
    clearInterval(ping);
    clearInterval(updateDB);
  });
}
