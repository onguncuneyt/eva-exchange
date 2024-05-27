import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
