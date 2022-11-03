export type UserInfo = {
  id: number;
  username: string;
};

interface Player {
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
};

export type RoomList = {
  name: string,
  users: UserInfo[]
}[]
