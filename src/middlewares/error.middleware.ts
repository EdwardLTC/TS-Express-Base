import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@httpModals';
import { logger } from '@utils/logger';

/**
 * @EdwardLTC
 * @description Error middleware for handling error
 * @param HttpException
 */

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    logger.error(error);
    res.status(error.statusCode).json(error);
  } catch (error) {
    next(error);
  }
};
