import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@/services/users';
import { HttpResponse } from '@/httpModals';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: HttpResponse = await this.user.findAllUser();
      res.status(findAllUsersData.statusCode).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: HttpResponse = await this.user.findUserById(userId);
      res.status(findOneUserData.statusCode).json(findOneUserData);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createUserData: HttpResponse = await this.user.createUser(userData);
      res.status(createUserData.statusCode).json(createUserData);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: HttpResponse = await this.user.updateUser(userId, userData);
      res.status(updateUserData.statusCode).json(updateUserData);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: HttpResponse = await this.user.deleteUser(userId);
      res.status(deleteUserData.statusCode).json(deleteUserData);
    } catch (error) {
      next(error);
    }
  };
}
