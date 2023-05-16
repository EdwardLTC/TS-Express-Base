import { Auth } from '@interfaces/auth';
import { Model, Schema, model } from 'mongoose';
import { jwtExpirySeconds } from '@/config';
export class AuthModel {
  private static instance: Model<Auth>;
  private initialize() {
    const AuthSchema: Schema<Auth> = new Schema<Auth>(
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

  public getInstance() {
    if (!AuthModel.instance) {
      this.initialize();
      AuthModel.instance = model<Auth>('Auth');
    }
    return AuthModel.instance;
  }
}
