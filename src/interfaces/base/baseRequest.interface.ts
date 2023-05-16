import { Request } from 'express';
import { User } from '../users';

export interface BaseRequest extends Request {
  user?: User;
  token?: string;
}
