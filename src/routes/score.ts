import RequestError from '../models/error.model';
import ScoreService from '../services/score.service';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { User } from '../models/user.model';

const router = Router();

router.post(
  '/save',
  passport.authenticate('jwt', { session: false }),
  body('score').exists(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    if (!req.user) return null;
    ScoreService.saveScore(
      req.body.score,
      req.user as User,
    )
      .then(() => {
        return res.sendStatus(StatusCodes.OK);
      })
      .catch((error: RequestError) => {
        return next(error);
      });
  },
);

router.get(
  '/get',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    if (!req.user) return null;

    ScoreService.getScores(
      req.user as User,
    )
      .then(score => {
        return res.json({ score: score }).status(StatusCodes.CREATED);
      })
      .catch((error: RequestError) => {
        return next(error);
      });
  },
);
export default router;
