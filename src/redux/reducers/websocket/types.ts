export type UserInfo = {
  id: number;
  username: string;
};

export interface Player {
  userId: number;
  lives: number;
  username: string;
}

export type Room = {
  name: string;
  started: boolean;
  lastWinner: UserInfo | null;
  users: UserInfo[];
  players: Player[];
  currentPlayer: number;
  playerInput: string | null;
};

export type RoomDetails = {
  name: string,
  users: UserInfo[]
};

export type RoomList = RoomDetails[];
