import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdateShareDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3, { message: 'Symbol must be 3 characters long' })
  symbol: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
