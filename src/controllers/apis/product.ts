import { ProductService } from '@/services/apis/product';
import Container from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/httpModals';

export class ProductController {
  //singleton
  private static instance: ProductController;
  public getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }

  private productService = Container.get(ProductService);

  public findAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.findAllProduct();
      res.status(products.statusCode).json(products);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData = req.body;
      const product = await this.productService.createProduct(productData);
      res.status(product.statusCode).json(product);
    } catch (error) {
      next(new HttpException(error));
    }
  };
}
