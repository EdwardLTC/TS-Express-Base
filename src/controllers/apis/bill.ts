import { HttpException } from '@/httpModals';
import { BaseRequest } from '@/interfaces/base/baseRequest.interface';
import { Bill } from '@/interfaces/bill';
import { BillService } from '@/services/apis/bill';
import { ProductService } from '@/services/apis/product';
import { ORDER_STATUS } from '@/utils/enumrator';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class BillController {
  //singleton
  private static instance: BillController;
  public getInstance(): BillController {
    if (!BillController.instance) {
      BillController.instance = new BillController();
    }
    return BillController.instance;
  }

  public bill = Container.get(BillService);
  public product = Container.get(ProductService);

  public createBill = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const billData: Bill = req.body;

      /**
       * @EdwardLTC
       * @description combine product id and increase quantity use Map to prevent duplicate product id
       * @example [{productId: 1, quantity: 2}, {productId: 2, quantity: 1}, {productId: 1, quantity: 1}] => [{productId: 1, quantity: 3}, {productId: 2, quantity: 1}]
       */
      const mergedArray = Array.from(
        billData.items.reduce((map, { product, quantity }) => map.set(product, (map.get(product) || 0) + quantity), new Map()),
      );

      //map to bill items
      billData.items = mergedArray.map(item => {
        return {
          product: item[0],
          quantity: item[1],
        };
      });
      //list product id
      const productIds = billData.items.map(item => item.product.toString());
      //check is list product valid
      const listProducts = await this.product.checkIsProductValid(productIds);
      if (!listProducts || listProducts.length === 0 || listProducts.length !== productIds.length) {
        throw new HttpException({ statusCode: 400, message: 'Product is not valid, Something are sold out refresh page or contact us' });
      }
      //total price
      let totalPrice = 0;
      billData.items.forEach(item => {
        const product = listProducts.find(product => product._id.toString() === item.product.toString());
        totalPrice += product.price * item.quantity;
      });

      //create bill
      billData.buyer_id = req.user._id;
      billData.status = ORDER_STATUS.PENDING;
      billData.total = totalPrice;
      const bill = await this.bill.createBill(billData);
      res.status(bill.statusCode).json(bill);
    } catch (error) {
      next(new HttpException({ statusCode: 400, message: error.message }));
    }
  };

  public findMyBill = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.user;
      const bills = await this.bill.findBillByUserId(_id.toString());
      res.status(bills.statusCode).json(bills);
    } catch (error) {
      next(new HttpException({ statusCode: 400, message: error.message }));
    }
  };

  public findBillById = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const bill = await this.bill.findBillById(id);
      res.status(bill.statusCode).json(bill);
    } catch (error) {
      next(new HttpException({ statusCode: 400, message: error.message }));
    }
  };
}
