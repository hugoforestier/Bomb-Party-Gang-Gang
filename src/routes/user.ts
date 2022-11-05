import RequestError from '../models/error.model';
import UserService from '../services/user.service';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { User } from 'models/user.model';

const router = Router();

router.post(
  '/register',
  body('username').exists(),
  body('password').isLength({ min: 5 }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.sendStatus(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    UserService.createUser(
      req.body.username,
      req.body.password,
    )
      .then(() => {
        return res.sendStatus(StatusCodes.CREATED);
      })
      .catch((error: RequestError) => {
        return next(error);
      });
  },
);

router.post(
  '/login',
  body('username').exists(),
  body('password').isLength({ min: 5 }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    passport.authenticate('local', { session: false }, function (err, user) {
      if (err) {
        if (err === 404) {
          return res.status(404).json({ error: 'User not found.' });
        } else {
          return next(err);
        }
      }
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized.' });
      }
      req.logIn(user, function (error) {
        if (error) {
          return next(error);
        }
        if (!req.user) {
          return res.status(404).json({ error: 'User not found.' });
        }
        const token = UserService.createAuthToken(req.user as User);
        return res.status(StatusCodes.CREATED).json({ jwt: token });
      });
    })(req, res, next);
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = req.user as User;

    res.json({
      user: {
        username: user.username,
        id: Number(user.id),
      },
    });
  },
);

export default router;
