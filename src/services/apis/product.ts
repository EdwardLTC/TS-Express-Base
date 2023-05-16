import { HttpResponse } from '@/httpModals';
import { Product } from '@/interfaces/product';
import { ProductModel } from '@/models/products';
import { PRODUCT_STATUS } from '@/utils/enumrator';
import { Service } from 'typedi';

@Service()
export class ProductService {
  private productModel = new ProductModel().getInstance();

  public async findAllProduct(): Promise<HttpResponse> {
    try {
      const products: Product[] = await this.productModel.find({ status: PRODUCT_STATUS.IN_STOCK });
      return new HttpResponse(products);
    } catch (error) {
      throw error;
    }
  }

  public async createProduct(product: Product): Promise<HttpResponse> {
    try {
      const newProduct: Product = await this.productModel.create(product);
      return new HttpResponse(newProduct);
    } catch (error) {
      throw error;
    }
  }

  public async checkIsProductValid(productIds: string[]): Promise<Product[]> {
    try {
      //check list product is still in stock and exist
      const productsInStock = await this.productModel.find({ _id: { $in: productIds }, status: PRODUCT_STATUS.IN_STOCK });
      return productsInStock.length === productIds.length ? productsInStock : null;
    } catch (error) {
      throw error;
    }
  }
}
