import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProductController } from '@/controllers/products';

export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.product.getProducts);
    this.router.get(`${this.path}`, this.product.getProductPriceAndId);
    this.router.get(`${this.path}/:id`, this.product.getProductById);
    this.router.post(`${this.path}`, this.product.createProduct);
    this.router.put(`${this.path}/:id`, this.product.updateProduct);
    this.router.delete(`${this.path}/:id`, this.product.deleteProduct);
  }
}
