import { model, Schema } from 'mongoose';
import { User } from '@interfaces/users.interface';

export class UserModel {
  constructor() {
    const UserSchema: Schema = new Schema<User>(
      {
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
          select: false,
        },
        name: {
          type: String,
          required: true,
        },
      },
      { timestamps: true },
    );
    try {
      model<User>('user', UserSchema);
    } catch (error) {}
  }
  getInstance() {
    return model<User>('user');
  }
}
