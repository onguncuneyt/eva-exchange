import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
