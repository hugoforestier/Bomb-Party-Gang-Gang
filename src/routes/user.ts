import RequestError from '../models/error.model';
import UserService from '../services/user.service';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { User } from 'models/user.model';
//import { on } from 'events';

const router = Router();

router.post(
  '/register',
  body('username').exists(),
  body('password').isLength({ min: 5 }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    UserService.createUser(
      req.body.username,
      req.body.password,
    )
      .then(() => {
        return res.sendStatus(StatusCodes.OK);
      })
      .catch((error: RequestError) => {
        console.log('error', error);
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
      console.log('hugo');
      req.logIn(user, function (error) {
        console.log('hugo');
        if (error) {
          return next(error);
        }
        if (!req.user) {
          return res.status(404).json({ error: 'User not found.' });
        }
        console.log('d');
        const token = UserService.createAuthToken(req.user as User);

        return res.status(200).json({ jwt: token });
      });
    })(req, res, next);
  },
);

export default router;



