import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
