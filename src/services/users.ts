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

  public async findUserByEmail(email: string, includePassword: Boolean = false): Promise<User> {
    return includePassword ? await this.userModel.findOne({ email: email }).select('+password') : await this.userModel.findOne({ email: email });
  }

  public async createUser(userData: User): Promise<HttpResponse> {
    try {
      const data = {
        email: userData.email,
        name: userData.name || '',
        password: userData.password,
        address: userData.address || '',
        phone: userData.phone || '',
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
      console.log(error);
      throw error;
    }
  }
}
