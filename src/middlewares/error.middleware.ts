import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@http/httpException';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    logger.error(error);
    res.status(error.statusCode).json(error);
  } catch (error) {
    next(error);
  }
};
