import { PRODUCT_STATUS } from '@/utils/enumrator';
import { ObjectId } from 'mongoose';

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  img: string;
  status: PRODUCT_STATUS.IN_STOCK | PRODUCT_STATUS.SOLD_OUT;
}
