import cookieParser from 'cookie-parser';
import { User } from '../../models/user.model';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import LocalStrategy from 'passport-local';
import KEYS from '../../config/keys';
import UserService from '../../services/user.service';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function passportInit(app: any): void {
  app.use(cookieParser());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new LocalStrategy.Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        UserService.findUserByUsername(username).then((user) => {

          if (!user) {
            return done(null, false);
          }

          if (!user.password) {
            return done(null, false);
          }

          const isValid = UserService.validatePassword(
            user.password,
            user.salt!,
            password,
          );

          if (isValid) {
            return done(null, user);
          }
          return done(null, false);
        });
      },
    ),
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          ExtractJWT.fromAuthHeaderAsBearerToken(),
          ExtractJWT.fromUrlQueryParameter('bearer'),
        ]),
        secretOrKey: KEYS.JWT_TOKEN_SECRET,
      },
      async function (jwtPayload, cb) {
        return UserService.findUserByUuid(jwtPayload.uuid)
          .then((user: User | null) => {
            return cb(null, user);
          }).catch((err: any) => {
            return cb(err);
          });
      },
    ),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
