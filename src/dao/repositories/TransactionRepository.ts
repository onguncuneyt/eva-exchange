import { ShareEntity, TransactionEntity } from 'src/entities';
import { InjectModel } from '@nestjs/sequelize';
import { ITransaction } from '../interfaces/ITransaction';
import { BuyShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuyShareRequest.dto';
import { SellShareRequestDto } from 'src/dtos/portfolioDtos/requests/SellShareRequest.dto';

export class TransactionRepository implements ITransaction {
  constructor(
    @InjectModel(TransactionEntity)
    private readonly transactionModel: typeof TransactionEntity,
  ) {}
  async sellCreate(
    sellShareRequestDto: SellShareRequestDto,
    share: ShareEntity,
    currUser: any,
  ): Promise<TransactionEntity> {
    return await this.transactionModel.create({
      userId: currUser.sub,
      shareId: sellShareRequestDto.shareId,
      amount: sellShareRequestDto.amount,
      price: share.rate,
      type: sellShareRequestDto.type,
    });
  }
  async buyCreate(
    buyShareRequestDto: BuyShareRequestDto,
    share: ShareEntity,
    currUser: any,
  ): Promise<TransactionEntity> {
    return await this.transactionModel.create({
      userId: currUser.sub,
      shareId: buyShareRequestDto.shareId,
      amount: buyShareRequestDto.amount,
      price: share.rate,
      type: buyShareRequestDto.type,
    });
  }
}
