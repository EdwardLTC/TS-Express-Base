import { HttpException } from '@/httpModals';
import { BaseRequest } from '@/interfaces/base/baseRequest.interface';
import { User } from '@/interfaces/users';
import { UserService } from '@/services/apis/users';
import { USER_STATUS } from '@/utils/enumrator';
import { NextFunction, Response } from 'express';

/**
 * @EdwardLTC
 * @description Check user status middleware
 *
 */
export const NormalUserMiddleware = () => {
  return async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const user: User = req.user || (await new UserService().findUserByPhone(req.body.phone));
      if (!user) {
        next(new HttpException({ statusCode: 404, message: 'User is not found, please register first' }));
      }
      switch (user.status) {
        case USER_STATUS.ACTIVE:
          next();
          break;
        case USER_STATUS.BANNED:
          next(new HttpException({ statusCode: 403, message: 'You has been banned' }));
          break;
        case USER_STATUS.ADMIN:
          next(new HttpException({ statusCode: 403, message: 'You do not have permission to access this client' }));
          break;
        default:
          next(new HttpException({ statusCode: 403, message: 'User is not active' }));
          break;
      }
    } catch (error) {
      next(new HttpException({ statusCode: 500 }));
    }
  };
};

export const AdminMiddleware = () => {
  return async (req: BaseRequest, res: Response, next: NextFunction) => {
    if (req.user.status !== USER_STATUS.ADMIN) {
      next(new HttpException({ statusCode: 403, message: 'You do not have permission' }));
    } else {
      next();
    }
  };
};
