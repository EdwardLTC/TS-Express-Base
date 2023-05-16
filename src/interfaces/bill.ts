import { ObjectId } from 'mongoose';
import { ORDER_STATUS } from '@/utils/enumrator';
export interface Bill {
  _id?: ObjectId;
  buyer_id: ObjectId;
  items: Array<{ product: ObjectId; quantity: number }>;
  status: ORDER_STATUS.DELIVERED | ORDER_STATUS.PENDING | ORDER_STATUS.SHIPPING;
  total: number;
}
