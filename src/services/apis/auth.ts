import { HttpException, HttpResponse } from '@/httpModals';
import { User } from '@/interfaces/users';
import { AuthModel } from '@/models/auth';
import Container, { Service } from 'typedi';
import { UserService } from './users';
import { DecodeToken, GenerateToken } from '@/utils/jwt';
import { ComparePassword } from '@/utils/user';

@Service()
export class AuthService {
  private authModel = new AuthModel().getInstance();
  private userService = Container.get(UserService);

  public async login(phone: string, password: string): Promise<HttpResponse> {
    //find user
    const user: User = await this.userService.findUserByPhone(phone, true);
    if (!user) {
      throw new HttpException({ message: 'Invalid Phone Number', statusCode: 422 });
    } else {
      //process login
      try {
        //check password
        const isMatch = await ComparePassword(password, user.password);
        if (!isMatch) {
          throw new HttpException({ message: 'Invalid Password', statusCode: 422 });
        } else {
          await this.authModel.deleteMany({ user: user._id }); //remove last token
          const token = GenerateToken(user); //generate new token
          await this.authModel.create({ token, user: user._id }); //save token
          const tokenData = await this.authModel.findOne({ token }).populate('user').select('-expiry');
          return new HttpResponse(tokenData);
        }
      } catch (error) {
        throw error;
      }
    }
  }

  public async logout(token: string): Promise<HttpResponse> {
    try {
      await this.authModel.deleteOne({ token });
      return new HttpResponse({ message: 'Logout successfully' });
    } catch (error) {
      throw error;
    }
  }

  public async checkToken(token: string): Promise<any> {
    try {
      const isValidToken = await this.authModel.countDocuments({ token });
      if (!isValidToken) {
        throw new HttpException({ message: 'Invalid Token', statusCode: 401 });
      }
      const decoded = DecodeToken(token);
      if (!decoded) {
        throw new HttpException({ message: 'Invalid Token', statusCode: 401 });
      } else {
        return decoded;
      }
    } catch (error) {
      throw error;
    }
  }
}
