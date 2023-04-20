import { ObjectId } from 'mongoose';

export interface Event {
  _id?: ObjectId;
  name: string;
  date: string;
  place: string;
  Department: string;
}
