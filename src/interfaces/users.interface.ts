import { ObjectId } from 'mongoose';

export interface User {
  _id?: ObjectId;
  email: string;
  name: string;
  password: string;
}

export interface Product {
  _id?: ObjectId;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}
