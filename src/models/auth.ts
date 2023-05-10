import { User } from '@/interfaces/users';
import { Auth } from '@interfaces/auth';
import { Model, Schema, model } from 'mongoose';
import { JWT_SECRET, jwtExpirySeconds } from '@/config';
import Jwt from 'jsonwebtoken';
export class AuthModel {
  private static instance: Model<Auth>;
  constructor() {
    const AuthSchema: Schema = new Schema<Auth>(
      {
        token: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        expiry: {
          type: Date,
          default: Date.now() + jwtExpirySeconds,
          required: false,
        },
      },
      { timestamps: true },
    );
    AuthSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });
    try {
      model<Auth>('Auth', AuthSchema);
    } catch (error) {}
  }

  public generateToken = (user: User) => {
    const token = Jwt.sign(
      {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone,
        avatar: user.avatar,
      },
      JWT_SECRET,
      {
        expiresIn: jwtExpirySeconds, // jwt expiry time in seconds (1 day)
        algorithm: 'HS256',
      },
    );
    return token;
  };

  public decodeToken = (token: string) => {
    const decoded = Jwt.verify(token, JWT_SECRET);
    return decoded;
  };

  getInstance() {
    if (!AuthModel.instance) {
      AuthModel.instance = model<Auth>('Auth');
    }
    return AuthModel.instance;
  }
}
