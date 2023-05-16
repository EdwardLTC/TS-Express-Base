import { Bill } from '@/interfaces/bill';
import { ORDER_STATUS } from '@/utils/enumrator';
import { Model, Schema, model } from 'mongoose';

export class BillModel {
  private static instance: Model<Bill>;
  private initialize() {
    const BillSchema = new Schema<Bill>({
      buyer_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      items: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      status: {
        type: String,
        default: ORDER_STATUS.PENDING,
      },
      total: {
        type: Number,
        default: 0,
      },
    });
    try {
      model<Bill>('bills', BillSchema);
    } catch (error) {}
  }

  public getInstance() {
    if (!BillModel.instance) {
      this.initialize();
      BillModel.instance = model<Bill>('bills');
    }
    return BillModel.instance;
  }
}
