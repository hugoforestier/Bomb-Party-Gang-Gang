export type Player = {
  username: string;
  id: number;
  lives: number;
};

export type Room  = {
  name: string;
  players: Player[];
};
