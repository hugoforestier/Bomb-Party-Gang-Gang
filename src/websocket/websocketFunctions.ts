import Room from './Room';
import { WebSocketClientInfo } from './types';

export const rooms: {
  [key: string]: Room
} = {}

// TODO document notifications
export function broadcastRoomInfo(room: Room) {
  const roomInfo = room.info();

  room.players.forEach(player => {
    player.send(JSON.stringify({
      info: 'roomInfo',
      data: roomInfo,
    }));
  });
}

export function sendRooms(client: WebSocketClientInfo) {
  client.send(JSON.stringify({
    info: 'rooms',
    //data: rooms.map(room => {name: room.name, players: room.players.length})
  }));
}

function setReady(client: WebSocketClientInfo, command: any) : boolean {
  const isReady: boolean = command.isReady;
  if (typeof isReady !== 'string') {
    return false;
  }
  if (client.info.authInfo!.roomName === undefined) {
    return false;
  }
  if (!rooms[client.info.authInfo!.roomName]) {
    return false;
  }
  if (client.info.ready === isReady) {
    return false;
  }
  client.info.ready = isReady;
  broadcastRoomInfo(rooms[client.info.authInfo!.roomName]);
  return true;
}

function looseLife(client: WebSocketClientInfo) : boolean {
  if (client.info.authInfo!.roomName === undefined) {
    return false;
  }
  if (!rooms[client.info.authInfo!.roomName]) {
    return false;
  } 
  client.info.lives -= 1;
  if (client.info.lives <= 0) {
    client.send
  }
  return true;
}

function restartClock(client: WebSocketClientInfo) {
  setTimeout(function() {
    looseLife(client);
  }, 15000);
}

function startGame(client: WebSocketClientInfo, _command: any) : boolean {
  if (client.info.authInfo!.roomName === undefined) {
    return false;
  }
  if (!rooms[client.info.authInfo!.roomName]) {
    return false;
  }
  const room : Room = rooms[client.info.authInfo!.roomName];
  room.players.forEach(player => {
    if (!player.info.ready) {
      return false;
    } 
  })
  broadcastRoomInfo(rooms[client.info.authInfo!.roomName]);
  restartClock(client)
  return true;
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

  rooms[name] = new Room(name, [], client);
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
  startGame,
  setReady,
};

export default websocketFunctions;
