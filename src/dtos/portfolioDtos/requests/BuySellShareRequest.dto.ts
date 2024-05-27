import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { TransactionTypeEnum } from 'src/entities';

export class BuySellShareRequestDto {
  @IsString()
  @IsNotEmpty()
  shareId: string;

  @IsString()
  @IsNotEmpty()
  portfolioId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(TransactionTypeEnum)
  @IsNotEmpty()
  type: TransactionTypeEnum;
}
