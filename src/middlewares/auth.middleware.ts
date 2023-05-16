import { HttpException } from '@/httpModals';
import { BaseRequest } from '@/interfaces/base/baseRequest.interface';
import { AuthService } from '@/services/apis/auth';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

/**
 * @EdwardLTC
 * @description Check token middleware
 * @returns req.user = tokenData, req.token = token
 */
export const CheckToken = () => {
  return async (req: BaseRequest, res: Response, next: NextFunction) => {
    const auth = Container.get(AuthService);
    try {
      const token = ExtractToken(req);
      console.log('token', token);
      if (!token || token === 'null') {
        next(new HttpException({ statusCode: 401, message: 'Missing token' }));
      }
      const checkTokenData = await auth.checkToken(token);
      req.user = checkTokenData;
      req.token = token;
      next();
    } catch (error) {
      next(new HttpException(error));
    }
  };
};

/**
 * @EdwardLTC
 * @description Extract token from request
 * @param BaseRequest
 */
export const ExtractToken = (req: BaseRequest) => {
  if (req.headers && req.headers.authorization) {
    const regex = new RegExp('^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$'); //JWT regex
    const parts = req.headers.authorization.split(' ');
    for (let i = 0; i < parts.length; i++) {
      if (regex.test(parts[i])) {
        return parts[i];
      }
    }
  } else if (req.query && req.query.token) {
    return req.query.token;
  } else if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};
