import { Product } from '@/interfaces/product';
import { PRODUCT_STATUS } from '@/utils/enumrator';
import { Model, Schema, model } from 'mongoose';

export class ProductModel {
  private static instance: Model<Product>;
  private initialize() {
    const ProductSchema = new Schema<Product>(
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
          required: true,
        },
        img: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          default: PRODUCT_STATUS.IN_STOCK,
        },
      },
      { timestamps: true },
    );
    try {
      model('product', ProductSchema);
    } catch (error) {}
  }

  public getInstance() {
    if (!ProductModel.instance) {
      this.initialize();
      ProductModel.instance = model<Product>('product');
    }
    return ProductModel.instance;
  }

  public isProduct(product: any): product is Product {
    return product && product.name && product.price && product.img;
  }
}
