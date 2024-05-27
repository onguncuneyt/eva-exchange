import { ShareEntity, TransactionEntity } from 'src/entities';
import { ITransaction } from '../interfaces/ITransaction';
import { BuyShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuyShareRequest.dto';
import { SellShareRequestDto } from 'src/dtos/portfolioDtos/requests/SellShareRequest.dto';
export declare class TransactionRepository implements ITransaction {
    private readonly transactionModel;
    constructor(transactionModel: typeof TransactionEntity);
    sellCreate(sellShareRequestDto: SellShareRequestDto, share: ShareEntity, currUser: any): Promise<TransactionEntity>;
    buyCreate(buyShareRequestDto: BuyShareRequestDto, share: ShareEntity, currUser: any): Promise<TransactionEntity>;
}
