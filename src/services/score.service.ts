import { StatusCodes } from 'http-status-codes';
import prisma from '..//client';
import { Score } from '../models/score.model';
import RequestError from '../models/error.model';
//import { user } from '@prisma/client';
import { User } from '../models/user.model';

export default class ScoreService {
  static async getScores(
    user: User,
  ): Promise<Score | null> {
    try {
      const score = await prisma.score.findUnique({
        where: {
          u_uuid: user.uuid,
        },
      });
      if (!score) {
        return null;
      }

      console.log(score?.s_highestScore);
      return new Score(
        score.s_highestScore,
        score.s_lowestScore,
        score.s_lastScore,
        score.s_nbGames,
        score.u_uuid,
      );
    } catch (e: any) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  static async saveScore(
    score: number,
    user: User,
  ): Promise<Score | null> {
    try {
      const prevScore = await ScoreService.getScores(user);
      if (!prevScore) return null;
      const newScore = new Score(
        prevScore.highestScore,
        prevScore.lowestScore,
        score,
        prevScore.nbGame,
        user.uuid);
      if (!prevScore) {
        await prisma.score.create({
          data:{
            u_uuid: user.uuid,
            s_highestScore: score,
            s_lowestScore: score,
            s_lastScore: score,
            s_nbGames: 1,
          },
        });
        return new Score(
          score,
          score,
          score,
          score,
          user.uuid,
        );
      }
      if (prevScore.lowestScore > score) {
        newScore.lowestScore = score;
      }
      if (prevScore.highestScore < score) {
        newScore.highestScore = score;
      }
      newScore.nbGame = prevScore.nbGame + 1;
      await prisma.score.update({
        where: {
          u_uuid: user.uuid,
        },
        data: {
          s_highestScore: newScore.highestScore,
          s_lowestScore: newScore.lowestScore,
          s_lastScore: score,
          s_nbGames: newScore.nbGame,
        },
      });
      return newScore;
    } catch (e: any) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
    }
  }
}

