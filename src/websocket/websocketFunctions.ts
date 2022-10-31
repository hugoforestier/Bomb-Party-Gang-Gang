import Room from './Room';
import { WebSocketClientInfo } from './types';

export const rooms: {
  [key: string]: Room
} = {}

// TODO document notifications
function broadcastRoomInfo(room: Room) {
  const roomInfo = room.info();

  room.players.forEach(player => {
    player.send(JSON.stringify({
      info: 'roomInfo',
      data: roomInfo,
    }));
  });
}

function notifyPlayerLeftRoom(client: WebSocketClientInfo) {
  client.send(JSON.stringify({
    info: 'noRoom',
  }));
}

function createRoom(client: WebSocketClientInfo, command: any): boolean {
  const name = command.name;
  if (typeof name !== 'string') {
    return false;
  }
  if (name in rooms) {
    return false;
  }

  rooms[name] = new Room(name, []);
  joinRoom(client, command);
  return true;
}

function joinRoom(client: WebSocketClientInfo, command: any): boolean {
  const name = command.name;
  if (typeof name !== 'string') {
    return false;
  }
  if (!(name in rooms)) {
    return false;
  }

  client.info.authInfo!.roomName = name;
  rooms[name].players.push(client);

  broadcastRoomInfo(rooms[name]);
  return true;
}

function leaveRoom(client: WebSocketClientInfo, _command: any): boolean {
  if (client.info.authInfo!.roomName === undefined) {
    return false;
  }
  const name = client.info.authInfo!.roomName;
  if (!(client.info.authInfo!.roomName in rooms)) {
    return false;
  }

  rooms[name].players = rooms[name].players.filter(
    player => {
      return player.info.authInfo!.user.id !== client.info.authInfo!.user.id;
    }
  );

  client.info.authInfo!.roomName = undefined;
  notifyPlayerLeftRoom(client);
  if (rooms[name].players.length === 0) {
    delete rooms[name];
  } else {
    broadcastRoomInfo(rooms[name]);
  }

  return true;
}

const websocketFunctions: {
  [key: string]: (client: WebSocketClientInfo, command: any) => void,
} = {
  createRoom,
  joinRoom,
  leaveRoom,
};

export default websocketFunctions;
