import { ObjectId } from 'mongoose';

export interface Auth {
  _id?: ObjectId;
  token: string;
  user: ObjectId; // User._id
  expiry?: Date;
}
