import { AuthController } from '@/controllers/auth';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/login`, this.auth.login);
    this.router.get(`${this.path}/logout`, this.auth.checkToken, this.auth.logout);
  }
}
