import { ProductController } from '@/controllers/apis/product';
import { CreateProductDtos } from '@/dtos/products.dtos';
import { Routes } from '@/interfaces/base/routes.interface';
import { CheckToken } from '@/middlewares/auth.middleware';
import { NormalUserMiddleware } from '@/middlewares/decentralization.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  private product = new ProductController().getInstance();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [CheckToken(), NormalUserMiddleware()], this.product.findAllProduct);
    this.router.post(`${this.path}`, [ValidationMiddleware(CreateProductDtos)], this.product.createProduct); // add admin middleware
  }
}
