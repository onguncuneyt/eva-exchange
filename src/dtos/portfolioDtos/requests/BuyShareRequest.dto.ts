import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionTypeEnum } from 'src/entities';

export class BuyShareRequestDto {
  @IsString()
  @IsNotEmpty()
  shareId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  type: TransactionTypeEnum.BUY;
}
