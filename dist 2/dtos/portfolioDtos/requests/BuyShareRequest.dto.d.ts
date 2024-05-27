import { TransactionTypeEnum } from 'src/entities';
export declare class BuyShareRequestDto {
    shareId: string;
    amount: number;
    type: TransactionTypeEnum.BUY;
}
