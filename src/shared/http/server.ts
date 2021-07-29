import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import rateLimiter from '@shared/middlewares/rateLimiter';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(
    `\n\n[ON] Server started at http://localhost:${port}\n\nCompiled at ${new Date().toLocaleString()}`,
  ),
);
