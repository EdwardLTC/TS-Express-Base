import { USER_STATUS } from '@/utils/enumrator';
import { ObjectId } from 'mongoose';

export interface User {
  _id?: ObjectId;
  phone: string;
  name: string;
  password: string;
  status: USER_STATUS.ACTIVE | USER_STATUS.BANNED | USER_STATUS.ADMIN;
  address: string;
  dob: Date;
  avatar: string;
}
