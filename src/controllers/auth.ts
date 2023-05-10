import { HttpException } from '@/httpModals';
import { BaseRequest } from '@/interfaces/baseRequest';
import { AuthService } from '@/services/auth';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class AuthController {
  public auth = Container.get(AuthService);

  public login = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        next(new HttpException({ statusCode: 400, message: 'Missing credentials' }));
      }
      const loginData = await this.auth.login(email, password);
      res.status(loginData.statusCode).json(loginData);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public logout = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        next(new HttpException({ statusCode: 401, message: 'Missing token' }));
      }
      const logoutData = await this.auth.logout(token);
      res.status(logoutData.statusCode).json(logoutData);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public checkToken = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const token = this.extractToken(req);
      if (!token || token === 'null') {
        next(new HttpException({ statusCode: 401, message: 'Missing token' }));
      }
      const checkTokenData = await this.auth.checkToken(token);
      req.user = checkTokenData;
      next();
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public extractToken = (req: BaseRequest) => {
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
}
