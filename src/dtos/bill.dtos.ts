import { ValidateNested } from '@/utils/validateNested';
import { IsArray, IsInt, IsNumber, IsString, Min } from 'class-validator';
import { Schema } from 'mongoose';

class Item {
  @IsString()
  public product: Schema.Types.ObjectId;

  @IsNumber()
  @IsInt()
  @Min(1)
  public quantity: number;
}
export class CreateBillDtos {
  @IsArray()
  @ValidateNested(Item)
  public items: Item[];
}
