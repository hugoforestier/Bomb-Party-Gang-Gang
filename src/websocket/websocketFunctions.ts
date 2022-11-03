import { wss } from '../index';
import Room, { RoomInfoShort } from './Room';
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

export function roomList(client: WebSocketClientInfo, listToSend?: RoomInfoShort[]) {
  const list: RoomInfoShort[] = listToSend ?? [];

  if (listToSend === undefined) {
    for (const roomName in rooms) {
      list.push(rooms[roomName].infoShort());
    }
  }

  client.send(JSON.stringify({
    info: 'rooms',
    list,
  }));
}

function broadcastRoomList() {
  const list: RoomInfoShort[] = [];

  for (const roomName in rooms) {
    list.push(rooms[roomName].infoShort());
  }

  wss.clients.forEach((client) => {
    if (client.info.authInfo === null)
      return;
    roomList(client, list);
  });
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
    room.nextTurn(1);
    broadcastRoomInfo(room);
    if (room.started)
      startClock(room);
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

function checkWord(word: string, statement: string) : boolean {
  return true;
}

function submitWord(client: WebSocketClientInfo, command: any): boolean {
  const room = getRoom(client.info.authInfo!.roomName);
  const word = command.word;
  const statement = command.statement;
  if (!room || !room.started || typeof word != 'string' || typeof statement != 'string') {
    return false;
  }
  if (room.players[room.currentPlayer].userId != Number(client.info.authInfo!.user.id) || room.timeout === undefined) {
    return false;
  }
  if (!checkWord(word, statement)) {
    room.nextTurn(1);
    return false;
  }
  room.nextTurn(0);
  clearTimeout(room.timeout);
  startClock(room);
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

  broadcastRoomList();
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

  room.users = room.users.filter(user => user.info.authInfo!.user.id !== client.info.authInfo!.user.id);

  client.info.authInfo!.roomName = undefined;
  notifyPlayerLeftRoom(client);
  if (room.users.length === 0) {
    delete rooms[name as string];
  } else {
    broadcastRoomInfo(room);
  }

  broadcastRoomList();

  return true;
}

const websocketFunctions = {
  createRoom,
  joinRoom,
  leaveRoom,
  startGame,
  setReady,
  submitWord,
};

export default websocketFunctions;
