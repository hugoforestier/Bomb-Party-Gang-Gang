export class Score {
  highestScore: number;

  lowestScore: number;

  lastScore: number;

  nbGame: number;

  u_uuid: string;

  constructor(
    highestScore: number,
    lowestScore: number,
    lastScore: number,
    nbGame: number,
    u_uuid: string,
  ) {
    this.highestScore = highestScore;
    this.lowestScore = lowestScore;
    this.lastScore = lastScore;
    this.nbGame = nbGame;
    this.u_uuid = u_uuid;
  }
}
