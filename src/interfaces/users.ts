import { ObjectId } from 'mongoose';

export interface User {
  _id?: ObjectId;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  dob: Date;
  avatar: string;
}
