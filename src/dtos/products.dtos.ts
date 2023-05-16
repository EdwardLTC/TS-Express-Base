import { Product } from '@/interfaces/product';
import { PRODUCT_STATUS } from '@/utils/enumrator';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateProductDtos implements Product {
  @IsNotEmpty()
  public name: string;
  @IsNotEmpty()
  public description: string;
  @Min(0)
  public price: number;
  @IsNotEmpty()
  public img: string;
  public status: PRODUCT_STATUS;
}
