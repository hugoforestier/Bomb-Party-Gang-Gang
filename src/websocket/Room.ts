import { WebSocketClientInfo } from 'websocket/types';

export type UserInfo = {
  id: number;
  username: string;
};

interface Player {
  userId: number;
  lives: number;
  username: string;
}

export type RoomInfo = {
  name: string;
  started: boolean;
  lastWinner: UserInfo | null;
  users: UserInfo[];
  players: Player[];
  currentPlayer: number;
};

export default class Room {
  name: string;

  started = false;

  lastWinner?: UserInfo;

  users: WebSocketClientInfo[];

  players: Player[] = [];

  currentPlayer = 0;

  timeout: NodeJS.Timeout | undefined;

  constructor(name: string, users: WebSocketClientInfo[]) {
    this.name = name;
    this.users = users;
  }

  isGameOver(): boolean {
    return this.players.filter(player => player.lives > 0).length <= 1;
  }

  setWinner() {
    this.started = false;
    this.currentPlayer = 0;
    this.lastWinner = undefined;
    const winningPlayer = this.players.find(player => player.lives > 0);
    this.players = [];
    if (!winningPlayer)
      return;
    this.lastWinner = {
      id: winningPlayer.userId,
      username: winningPlayer.username,
    };
  }

  public loseTurn() {
    this.players[this.currentPlayer].lives -= 1;
    if (this.isGameOver()) {
      this.setWinner();
      return;
    }
    do {
      console.log('oopsie');
      this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    } while (this.players[this.currentPlayer].lives <= 0);
  }

  public setUserReady(id: number, ready: boolean): boolean {
    const player = this.players.findIndex(p => p.userId === id);
    const user = this.users.find(u => Number(u.info.authInfo!.user.id) === id);
    if (user === undefined)
      return false;
    if (ready) {
      if (player !== -1)
        return false;
      this.players.push({
        lives: 2,
        userId: id,
        username: user.info.authInfo!.user.username,
      });
    } else {
      if (player === -1)
        return false;
      this.players = this.players.filter((p) => p.userId !== id);
    }
    return true;
  }

  public info(): RoomInfo {
    return {
      name: this.name,
      lastWinner: this.lastWinner ?? null,
      users: this.users.map((user) => ({
        username: user.info.authInfo!.user.username,
        id: Number(user.info.authInfo!.user.id),
      })),
      // create a copy just in case
      players: [...this.players],
      started: this.started,
      currentPlayer: this.currentPlayer,
    };
  }
}
