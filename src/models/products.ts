import { model, Schema } from 'mongoose';
import { Product } from '@interfaces/users.interface';

export class productModel {
  constructor() {
    const productSchema: Schema = new Schema<Product>(
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true },
    );

    try {
      model<Product>('product', productSchema);
    } catch (error) {}
  }
  getInstance() {
    return model<Product>('product');
  }
}
