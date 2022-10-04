export class Score {
  highestScore: number;

  lowestScore: number;

  lastScore: number;

  nbGame: number;

  u_id: bigint;

  constructor(
    highestScore: number,
    lowestScore: number,
    lastScore: number,
    nbGame: number,
    u_id: bigint,
  ) {
    this.highestScore = highestScore;
    this.lowestScore = lowestScore;
    this.lastScore = lastScore;
    this.nbGame = nbGame;
    this.u_id = u_id;
  }
}
