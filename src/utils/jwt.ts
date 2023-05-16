import { JWT_SECRET, jwtExpirySeconds } from '@/config';
import { User } from '@/interfaces/users';
import Jwt from 'jsonwebtoken';

export const GenerateToken = (user: User) => {
  const token = Jwt.sign(
    {
      _id: user._id.toString(),
      status: user.status,
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

export const DecodeToken = (token: string) => {
  const decoded = Jwt.verify(token, JWT_SECRET);
  return decoded;
};
