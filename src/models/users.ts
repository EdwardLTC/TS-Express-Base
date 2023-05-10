import { Model, model, Schema } from 'mongoose';
import { User } from '@/interfaces/users';
import { hash, compare } from 'bcrypt';
export class UserModel {
  private static instance: Model<User>;
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
          required: false,
        },
        address: {
          type: String,
          required: false,
        },
        phone: {
          type: String,
          required: false,
        },
        dob: {
          type: Date,
          required: false,
        },
        avatar: {
          type: String,
          required: false,
        },
      },
      { timestamps: true },
    );

    // Hash password before save
    UserSchema.pre('save', function (next) {
      const user = this as unknown as User;
      if (!this.isModified('password')) return next();
      hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });

    try {
      model<User>('user', UserSchema);
    } catch (error) {}
  }

  // compare password
  public comparePassword = (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
      compare(password, hash, (err, isMatch) => {
        if (err) return reject(err);
        if (!isMatch) return reject(false);
        resolve(true);
      });
    });
  };

  getInstance() {
    if (!UserModel.instance) {
      UserModel.instance = model<User>('user');
    }
    return UserModel.instance;
  }
}
