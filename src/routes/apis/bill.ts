import { BillController } from '@/controllers/apis/bill';
import { CreateBillDtos } from '@/dtos/bill.dtos';
import { Routes } from '@/interfaces/base/routes.interface';
import { CheckToken } from '@/middlewares/auth.middleware';
import { NormalUserMiddleware } from '@/middlewares/decentralization.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class BillRoute implements Routes {
  public path = '/bills';
  public router = Router();
  private bill = new BillController().getInstance();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, [CheckToken(), NormalUserMiddleware(), ValidationMiddleware(CreateBillDtos)], this.bill.createBill);
    this.router.get(`${this.path}`, [CheckToken(), NormalUserMiddleware()], this.bill.findMyBill);
    this.router.get(`${this.path}/:id`, [CheckToken(), NormalUserMiddleware()], this.bill.findBillById);
  }
}
