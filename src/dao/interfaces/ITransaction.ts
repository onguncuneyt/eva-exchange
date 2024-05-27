import { BuySellShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuySellShareRequest.dto';
import { ShareEntity, TransactionEntity } from 'src/entities';

export interface ITransaction {
  buyCreate(
    buySellShareRequestDto: BuySellShareRequestDto,
    share: ShareEntity,
    currUser: any,
  );

  sellCreate(
    buySellShareRequestDto: BuySellShareRequestDto,
    share: ShareEntity,
    currUser: any,
  );

  listAllTransactions(): Promise<TransactionEntity[]>;
  listUsersAllTransactions(user: any): Promise<TransactionEntity[]>;
}
