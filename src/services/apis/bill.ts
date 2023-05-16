import { HttpResponse } from '@/httpModals';
import { Bill } from '@/interfaces/bill';
import { BillModel } from '@/models/bill';
import { Service } from 'typedi';

@Service()
export class BillService {
  private billModel = new BillModel().getInstance();
  public async createBill(bill: Bill): Promise<HttpResponse> {
    try {
      const newBill: Bill = await this.billModel.create(bill);
      return new HttpResponse(newBill);
    } catch (error) {
      throw error;
    }
  }

  public async findBillByUserId(id: string): Promise<HttpResponse> {
    try {
      const bills: any = await this.billModel
        .find({ buyer_id: id })
        .populate({ path: 'items', select: '-_id' })
        .populate({ path: 'items.product' })
        .sort({ createdAt: -1 });
      return new HttpResponse(bills);
    } catch (error) {
      throw error;
    }
  }

  public async findBillById(id: string): Promise<HttpResponse> {
    try {
      const bill: Bill = await this.billModel.findById(id).populate({ path: 'items.product', select: 'name description img' });
      return new HttpResponse(bill);
    } catch (error) {
      throw error;
    }
  }
}
