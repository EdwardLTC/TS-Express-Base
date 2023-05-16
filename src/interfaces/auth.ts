import { ObjectId } from 'mongoose';
import { Document } from 'mongodb';

export interface Auth extends Document {
  _id?: ObjectId;
  token: string;
  user: ObjectId; // User._id
  expiry?: Date;
}
