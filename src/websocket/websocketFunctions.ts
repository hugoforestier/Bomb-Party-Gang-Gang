import { wss } from '../index';
import Room, { RoomInfoShort } from './Room';
import { WebSocketClientInfo } from './types';
import { readFileSync } from 'fs';

const dictionary = readFileSync('./dictionary/fr.txt', 'utf-8');
const statements = readFileSync('./dictionary/statements.txt', 'utf-8').split('\n');

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
  if (typeof isReady !== 'string') {
    return false;
  }
  const room = getRoom(client.info.authInfo!.roomName);
  if (room === null || !room.setUserReady(Number(client.info.authInfo!.user.id), isReady)) {
    return false;
  }
  broadcastRoomInfo(room);
  return true;
}

function getNewStatement() : string {
  let randomNumber = Math.floor(Math.random() * (statements.length - 1));
  if (randomNumber == 0) {
    randomNumber = 1
  }
  return statements[randomNumber];
}

function startClock(room: Room) {
  if (!room.started)
    return;
  room.timeout = setTimeout(function () {
    if (room.failsUntilChange > 1) {
      room.statement = getNewStatement();
      room.failsUntilChange = 0;
    }
    room.failsUntilChange+=1;
    room.nextTurn(1);
    broadcastRoomInfo(room);
    if (room.started)
      startClock(room);
  }, 1000000); // TODO change to 15000 again 
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
  room.currentPlayer = 0;
  room.statement = getNewStatement();
  startClock(room);
  broadcastRoomInfo(room);
  return true;
}

function checkWord(word: string, statement: string | null): boolean {
  const formatedWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (statement == null) {
    return true;
  }
  if (!formatedWord.includes(statement)) {
    return false;
  }
  if (!dictionary.includes(formatedWord + '\n')) {
    return false;
  }
  return true;
}

function submitWord(client: WebSocketClientInfo, command: any): boolean {
  const room = getRoom(client.info.authInfo!.roomName);
  const word = command.word;
  if (!room || !room.started || typeof word != 'string') {
    return false;
  }
  if (room.players[room.currentPlayer].userId != Number(client.info.authInfo!.user.id) || room.timeout === undefined) {
    return false;
  }
  if (!checkWord(word, room.statement)) {
    return false;
  }
  room.nextTurn(0);
  clearTimeout(room.timeout);
  room.statement = getNewStatement();
  startClock(room);
  broadcastRoomInfo(room);
  return true;
}

function joinRoom(client: WebSocketClientInfo, command: any): boolean {
  const name = command.name;
  const room = getRoom(name);
  if (room === null || room.users.find(user => user.info.authInfo!.user.id === client.info.authInfo!.user.id)) {
    return false;
  }

  if (room.users.length >= 5) {
    return false;
  }

  client.info.authInfo!.roomName = name;
  room.users.push(client);

  if (room.deleteTimeout) {
    clearTimeout(room.deleteTimeout);
  }

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
  if (room.started === false) {
    room.players = room.players.filter(p => p.userId !== Number(client.info.authInfo!.user.id));
  }

  client.info.authInfo!.roomName = undefined;
  notifyPlayerLeftRoom(client);
  if (room.users.length === 0) {
    room.deleteTimeout = setTimeout(() => {
      delete rooms[name as string];
      broadcastRoomList();
    }, 60000);
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
