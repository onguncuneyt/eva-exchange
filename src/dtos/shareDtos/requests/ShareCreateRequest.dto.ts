import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateShareDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3, { message: 'Symbol must be 3 characters long' })
  symbol: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
