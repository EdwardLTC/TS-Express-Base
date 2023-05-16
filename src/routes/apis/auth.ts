import { AuthController } from '@/controllers/apis/auth';
import { UserDto } from '@/dtos/users.dto';
import { Routes } from '@/interfaces/base/routes.interface';
import { CheckToken } from '@/middlewares/auth.middleware';
import { NormalUserMiddleware } from '@/middlewares/decentralization.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController().getInstance();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/login`, [ValidationMiddleware(UserDto), NormalUserMiddleware()], this.auth.login);
    this.router.get(`${this.path}/logout`, [CheckToken()], this.auth.logout);
  }
}
