import { BuyShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuyShareRequest.dto';
import { ShareEntity, TransactionEntity } from 'src/entities';
import { SellShareRequestDto } from 'src/dtos/portfolioDtos/requests/SellShareRequest.dto';

export interface ITransaction {
  buyCreate(
    buyShareRequestDto: BuyShareRequestDto,
    share: ShareEntity,
    currUser: any,
  ): Promise<TransactionEntity>;

  sellCreate(
    sellShareRequestDto: SellShareRequestDto,
    share: ShareEntity,
    currUser: any,
  ): Promise<TransactionEntity>;
}
