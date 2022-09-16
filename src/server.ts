import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
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
const { BAD_REQUEST } = StatusCodes;

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

app.use((err: Error, req: Request, res: Response) => {
  console.log(req.resume);
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

export default app;
