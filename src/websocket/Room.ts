import { WebSocketClientInfo } from 'websocket/types';

type RoomInfo = {
  name: string,
  players: string[],
};

export default class Room {
  name: string;

  players: WebSocketClientInfo[];

  constructor(name: string, players: WebSocketClientInfo[]) {
    this.name = name;
    this.players = players;
  }

  public info(): RoomInfo {
    return {
      name: this.name,
      players: this.players.map(player => player.info.authInfo!.user.username),
    };
  }
}
