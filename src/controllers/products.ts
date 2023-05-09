import { HttpResponse } from '@/httpModals';
import { Product } from '@/interfaces/users.interface';
import { ProductService } from '@/services/products';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class ProductController {
  public product = Container.get(ProductService);

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: HttpResponse = await this.product.findAllProducts();
      res.status(findAllProductsData.statusCode).json(findAllProductsData);
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const findOneProductData: HttpResponse = await this.product.findProductById(productId);
      res.status(findOneProductData.statusCode).json(findOneProductData);
    } catch (error) {
      next(error);
    }
  };

  public getProductPriceAndId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: any = req.query.id;
      const productPrice: any = req.query.price;
      const findProductPriceAndIdData: HttpResponse = await this.product.findProductPriceAndId(productId, productPrice as unknown as number);
      res.status(findProductPriceAndIdData.statusCode).json(findProductPriceAndIdData);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: Product = req.body;
      const createProductData: HttpResponse = await this.product.createProduct(productData);
      res.status(createProductData.statusCode).json(createProductData);
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: Product = req.body;
      const updateProductData: HttpResponse = await this.product.updateProduct(productId, productData);
      res.status(updateProductData.statusCode).json(updateProductData);
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const deleteProductData: HttpResponse = await this.product.deleteProduct(productId);
      res.status(deleteProductData.statusCode).json(deleteProductData);
    } catch (error) {
      next(error);
    }
  };
}
