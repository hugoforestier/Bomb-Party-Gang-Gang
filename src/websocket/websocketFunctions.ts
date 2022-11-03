import Room, { RoomInfo } from './Room';
import { WebSocketClientInfo } from './types';

export const rooms: {
  [key: string]: Room
} = {};

// TODO document notifications
export function broadcastRoomInfo(room: Room) {
  const roomInfo = room.info();

  room.users.forEach(user => {
    user.send(JSON.stringify({
      info: 'roomInfo',
      roomInfo,
    }));
  });
}

export function roomList(client: WebSocketClientInfo) {
  const list: RoomInfo[] = [];

  for (const roomName in rooms) {
    list.push(rooms[roomName].info());
  }

  client.send(JSON.stringify({
    info: 'rooms',
    list,
  }));
}

function notifyPlayerLeftRoom(client: WebSocketClientInfo) {
  client.send(JSON.stringify({
    info: 'noRoom',
  }));
}

function getRoom(roomName: any): Room | null {
  if (typeof roomName === 'string' && roomName in rooms) {
    return rooms[roomName];
  }
  return null;
}

function setReady(client: WebSocketClientInfo, command: any): boolean {
  const isReady: boolean = command.isReady;
  if (typeof isReady !== 'boolean') {
    return false;
  }
  const room = getRoom(client.info.authInfo!.roomName);
  if (room === null || !room.setUserReady(Number(client.info.authInfo!.user.id), isReady)) {
    return false;
  }
  broadcastRoomInfo(room);
  return true;
}

function startClock(room: Room) {
  if (!room.started)
    return;
  room.timeout = setTimeout(function () {
    room.loseTurn();
    if (room.started)
      startClock(room);
    else
      broadcastRoomInfo(room);
  }, 15000);
}

function startGame(client: WebSocketClientInfo): boolean {
  const room = getRoom(client.info.authInfo!.roomName);
  if (!room) {
    return false;
  }
  if (room.players.length < 2) {
    return false;
  }
  room.started = true;
  startClock(room);
  broadcastRoomInfo(room);
  return true;
}

function joinRoom(client: WebSocketClientInfo, command: any): boolean {
  const name = command.name;
  const room = getRoom(name);
  if (room === null) {
    return false;
  }

  client.info.authInfo!.roomName = name;
  room.users.push(client);

  broadcastRoomInfo(room);
  return true;
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

function leaveRoom(client: WebSocketClientInfo): boolean {
  const name = client.info.authInfo!.roomName;
  const room = getRoom(name);
  if (room === null) {
    return false;
  }

  room.users = room.users.filter(
    user => {
      return user.info.authInfo!.user.id !== client.info.authInfo!.user.id;
    },
  );

  client.info.authInfo!.roomName = undefined;
  notifyPlayerLeftRoom(client);
  if (room.players.length === 0) {
    delete rooms[name as string];
  } else {
    broadcastRoomInfo(room);
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
