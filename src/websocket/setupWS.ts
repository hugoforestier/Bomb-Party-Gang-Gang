import { wss } from '../index';
import { getConnectedUserIds } from './utilsWS';
import UserService from '../services/user.service';
import { ClientInfo, WebSocketClientInfo } from './types';

const ping = setInterval(() => {
  wss.clients.forEach(function each(ws) {
    console.log("alive?", ws.info);
    if (ws.info.alive === false) {
      ws.terminate();
      console.log("terminating")
      return;
    }

    ws.info.alive = false;
    ws.ping(()=> { return; });
  });
}, 30000); // 30 seconds

const updateDB = setInterval(() => {
  const connected = getConnectedUserIds();
  UserService.setStatuses(connected);
}, 600000); // 10 minutes


export function initWebSocket(): void {
  wss.on('connection', (ws: WebSocketClientInfo): void => {
    ws.info = new ClientInfo();

    ws.on('message', (msg) => {
      ws.send(msg);
    });

    ws.on('pong', () => {
      ws.info.alive = true;
    });

  });

  wss.on('close', () => {
    console.log("Closed");
    clearInterval(ping);
    clearInterval(updateDB);
  });
}
