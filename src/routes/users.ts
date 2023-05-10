import { Router } from 'express';
import { UserController } from '@/controllers/users';
import { Routes } from '@interfaces/routes.interface';
import { AuthController } from '@/controllers/auth';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.auth.checkToken, this.user.getUsers);
    this.router.post(`${this.path}`, this.user.createUser);
    this.router.put(`${this.path}`, this.auth.checkToken, this.user.updateUser);
    this.router.put(`${this.path}/change-password`, this.auth.checkToken, this.user.changePassword);
  }
}
