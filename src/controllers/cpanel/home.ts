import { BaseRequest } from '@/interfaces/base/baseRequest.interface';
import { NextFunction, Response } from 'express';

export class HomeController {
  public home = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      res.render('index');
    } catch (error) {
      next(error);
    }
  };
}
