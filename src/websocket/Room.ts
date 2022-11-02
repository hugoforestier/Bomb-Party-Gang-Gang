import { WebSocketClientInfo } from 'websocket/types';

type RoomInfo = {
  name: string;
  players: {
    username: string,
    lives: number
  }[]
};

export default class Room {
  name: string;

  players: WebSocketClientInfo[];

  playerToPlay: WebSocketClientInfo;

  constructor(name: string, players: WebSocketClientInfo[], firstPlayer: WebSocketClientInfo) {
    this.name = name;
    this.players = players;
    this.playerToPlay = firstPlayer;
  }

  public info(): RoomInfo {
    return {
      name: this.name,
      players: this.players.map((player) => ({username: player.info.authInfo!.user.username, lives: player.info.lives})),
    };
  }
}
