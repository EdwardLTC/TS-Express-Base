import { ObjectId } from 'mongoose';

export interface Media {
  _id?: ObjectId;
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  path: string;
  size: number;
}
