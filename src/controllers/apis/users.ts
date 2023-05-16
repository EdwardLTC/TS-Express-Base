import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@/interfaces/users';
import { UserService } from '@/services/apis/users';
import { HttpResponse } from '@/httpModals/httpResponse';
import { BaseRequest } from '@/interfaces/base/baseRequest.interface';
import { hash } from 'bcrypt';
import { HttpException } from '@/httpModals';

export class UserController {
  //singleton
  private static instance: UserController;
  public getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public user = Container.get(UserService);

  public getUsers = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: HttpResponse = await this.user.findAllUser();
      res.status(findAllUsersData.statusCode).json(findAllUsersData);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public createUser = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createUserData: HttpResponse = await this.user.createUser(userData);
      res.status(createUserData.statusCode).json(createUserData);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public updateUser = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id.toString();
      const userData: User = req.body;
      const updateUserData: HttpResponse = await this.user.updateUser(userId, userData);
      res.status(updateUserData.statusCode).json(updateUserData);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public changePassword = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      if (!userData) {
        next(new HttpException({ statusCode: 400, message: 'No user found in request body' }));
      }
      const password: string = req.body.password;
      if (!password) {
        next(new HttpException({ statusCode: 400, message: 'No password found in request body' }));
      }
      hash(password, 10, (err, hash) => {
        if (err) return next(err);
        userData.password = hash;
      });
      const updateUserData: HttpResponse = await this.user.updateUser(userData._id.toString(), userData);
      res.status(updateUserData.statusCode).json(updateUserData);
    } catch (error) {
      next(new HttpException(error));
    }
  };
}
