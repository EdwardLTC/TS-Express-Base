import { IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  public phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
