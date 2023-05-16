import { HttpException } from '@/httpModals';
import { BaseRequest } from '@/interfaces/base/baseRequest.interface';
import { AuthService } from '@/services/apis/auth';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class AuthController {
  //singleton
  private static instance: AuthController;
  public getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  public auth = Container.get(AuthService);

  public login = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { phone, password } = req.body;
      const loginData = await this.auth.login(phone, password);
      res.status(loginData.statusCode).json(loginData);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public logout = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const logoutData = await this.auth.logout(req.token);
      res.status(logoutData.statusCode).json(logoutData);
    } catch (error) {
      next(new HttpException(error));
    }
  };
}
