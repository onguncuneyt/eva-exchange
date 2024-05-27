import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionTypeEnum } from 'src/entities';

export class SellShareRequestDto {
  @IsString()
  @IsNotEmpty()
  shareId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  type: TransactionTypeEnum.SELL;
}
