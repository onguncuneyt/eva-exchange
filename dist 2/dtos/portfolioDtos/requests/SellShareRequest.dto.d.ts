import { TransactionTypeEnum } from 'src/entities';
export declare class SellShareRequestDto {
    shareId: string;
    amount: number;
    type: TransactionTypeEnum.SELL;
}
