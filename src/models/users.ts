import { Model, model, Schema } from 'mongoose';
import { User } from '@/interfaces/users';
import { hash } from 'bcrypt';
import { USER_STATUS } from '@/utils/enumrator';
export class UserModel {
  private static instance: Model<User>;
  private initialize() {
    const UserSchema: Schema = new Schema<User>(
      {
        phone: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
          select: false,
        },
        status: {
          type: String,
          default: USER_STATUS.ACTIVE,
        },
        name: {
          type: String,
          required: false,
        },
        address: {
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

  public getInstance() {
    if (!UserModel.instance) {
      this.initialize();
      UserModel.instance = model<User>('user');
    }
    return UserModel.instance;
  }

  public isUser(user: any): user is User {
    return user && user.phone && user.password;
  }
}
