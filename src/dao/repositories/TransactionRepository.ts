import { ShareEntity, TransactionEntity } from 'src/entities';
import { InjectModel } from '@nestjs/sequelize';
import { ITransaction } from '../interfaces/ITransaction';
import { BuySellShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuySellShareRequest.dto';

export class TransactionRepository implements ITransaction {
  constructor(
    @InjectModel(TransactionEntity)
    private readonly transactionModel: typeof TransactionEntity,
  ) {}
  listAllTransactions(): Promise<TransactionEntity[]> {
    return this.transactionModel.findAll();
  }
  listUsersAllTransactions(user: any): Promise<TransactionEntity[]> {
    return this.transactionModel.findAll({
      where: { userId: user.sub },
    });
  }
  async sellCreate(
    buySellShareRequestDto: BuySellShareRequestDto,
    share: ShareEntity,
    currUser: any,
  ) {
    await this.transactionModel.create({
      userId: currUser.sub,
      shareId: buySellShareRequestDto.shareId,
      amount: buySellShareRequestDto.amount,
      price: share.rate,
      type: buySellShareRequestDto.type,
    });
  }
  async buyCreate(
    buySellShareRequestDto: BuySellShareRequestDto,
    share: ShareEntity,
    currUser: any,
  ) {
    console.log(buySellShareRequestDto);

    await this.transactionModel.create({
      userId: currUser.sub,
      shareId: buySellShareRequestDto.shareId,
      amount: buySellShareRequestDto.amount,
      price: share.rate,
      type: buySellShareRequestDto.type,
    });
  }
}
