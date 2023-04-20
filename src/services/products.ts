import { Service } from 'typedi';
import { HttpException, HttpResponse } from '@/httpModals';
import { Product } from '@interfaces/users.interface';
import { productModel } from '@/models/products';

@Service()
export class ProductService {
  private productModel = new productModel().getInstance();

  public async findAllProducts(): Promise<HttpResponse> {
    try {
      const product: Product[] = await this.productModel.find();
      return new HttpResponse(product);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async findProductById(productId: string): Promise<HttpResponse> {
    try {
      const findProduct: Product = await this.productModel.findOne({ _id: productId });
      return new HttpResponse(findProduct);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async findProductPriceAndId(productId: string, productPrice: number): Promise<HttpResponse> {
    try {
      if (!productId || !productPrice) throw new HttpException({ message: 'Please provide product id and price', statusCode: 400 });
      const findProduct: Product = await this.productModel.findOne({ _id: productId, price: productPrice });
      if (!findProduct) throw new HttpException({ message: 'Product not found', statusCode: 404 });
      return new HttpResponse(findProduct);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async createProduct(productData: Product): Promise<HttpResponse> {
    try {
      const createProductData: Product = await this.productModel.create(productData);
      return new HttpResponse(createProductData);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async updateProduct(userId: string, productData: Product): Promise<HttpResponse> {
    try {
      const updateUserById: Product = await this.productModel.findByIdAndUpdate(userId, { productData });
      return new HttpResponse(updateUserById);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async deleteProduct(userId: string): Promise<HttpResponse> {
    try {
      const deleteUserById: Product = await this.productModel.findByIdAndDelete(userId);
      return new HttpResponse(deleteUserById);
    } catch (error) {
      throw new HttpException(error);
    }
  }
}
