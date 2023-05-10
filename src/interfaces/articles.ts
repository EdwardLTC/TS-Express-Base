import { ObjectId } from 'mongoose';

export interface Article {
  _id?: ObjectId;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  createdBy: ObjectId; // User._id
}
