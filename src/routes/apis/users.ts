import { Router } from 'express';
import { UserController } from '@/controllers/apis/users';
import { Routes } from '@interfaces/base/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { UpdateUserDto, UserDto } from '@/dtos/users.dto';
import { CheckToken } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController().getInstance();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(UserDto), this.user.createUser);
    this.router.put(`${this.path}`, CheckToken(), this.user.updateUser);
    this.router.put(`${this.path}/change-password`, [CheckToken(), ValidationMiddleware(UpdateUserDto)], this.user.changePassword);
  }
}
