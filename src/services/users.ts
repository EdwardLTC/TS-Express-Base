import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException, HttpResponse } from '@/httpModals';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@/models/users';

@Service()
export class UserService {
  private userModel = new UserModel().getInstance();

  public async findAllUser(): Promise<HttpResponse> {
    try {
      const users: User[] = await this.userModel.find();
      return new HttpResponse(users);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async findUserById(userId: string): Promise<HttpResponse> {
    try {
      const findUser: User = await this.userModel.findOne({ _id: userId });
      return new HttpResponse(findUser);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async createUser(userData: User): Promise<HttpResponse> {
    try {
      const hashedPassword = await hash(userData.password, 10);
      const createUserData: User = await this.userModel.create({ ...userData, password: hashedPassword });
      return new HttpResponse(createUserData);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async updateUser(userId: string, userData: User): Promise<HttpResponse> {
    try {
      const updateUserById: User = await this.userModel.findByIdAndUpdate(userId, { userData });
      return new HttpResponse(updateUserById);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async deleteUser(userId: string): Promise<HttpResponse> {
    try {
      const deleteUserById: User = await this.userModel.findByIdAndDelete(userId);
      return new HttpResponse(deleteUserById);
    } catch (error) {
      throw new HttpException(error);
    }
  }
}
