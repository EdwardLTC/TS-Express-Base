import { Service } from 'typedi';
import { HttpResponse } from '@/httpModals';
import { User } from '@/interfaces/users';
import { UserModel } from '@/models/users';

@Service()
export class UserService {
  private userModel = new UserModel().getInstance();

  public async findAllUser(): Promise<HttpResponse> {
    try {
      const users: User[] = await this.userModel.find();
      return new HttpResponse(users);
    } catch (error) {
      throw error;
    }
  }

  public async findUserByPhone(phone: string, includePassword: Boolean = false): Promise<User> {
    return includePassword ? await this.userModel.findOne({ phone: phone }).select('+password') : await this.userModel.findOne({ phone: phone });
  }

  public async createUser(userData: User): Promise<HttpResponse> {
    try {
      const data = {
        phone: userData.phone,
        password: userData.password,
        name: userData.name || '',
        address: userData.address || '',
        dob: userData.dob || new Date(),
        avatar: userData.avatar || '',
      };
      const createUserData: User = await this.userModel.create(data);
      return new HttpResponse(createUserData);
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(userId: string, userData: User): Promise<HttpResponse> {
    try {
      const updateUserById: User = await this.userModel.findByIdAndUpdate(userId, userData, { returnDocument: 'after' });
      return new HttpResponse(updateUserById);
    } catch (error) {
      throw error;
    }
  }
}
