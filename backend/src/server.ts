import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import morgan from 'morgan';
import BaseRouter from './routes/index';
import UserRouter from './routes/user';
import logger from './shared/Logger';
import passport from './pre-start/passport/passport.init';

const app = express();

passport(app);
const { INTERNAL_SERVER_ERROR } = StatusCodes;

/** **********************************************************************************
 *                              Set basic express settings
 * ********************************************************************************* */

const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

const options: cors.CorsOptions = { // add remove line from eslint
  origin: allowedOrigins,
};

console.log(options);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

app.use('/', BaseRouter);
app.use('/user', UserRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(req.resume);
  logger.err(err, true);

  let status = INTERNAL_SERVER_ERROR;
  if (err.status) {
    status = err.status;
  }
  
  return res.status(status).json({
    error: err.message,
  });

  // dead code to remove linter warning
  next();
});

export default app;
