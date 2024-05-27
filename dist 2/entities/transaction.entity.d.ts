import { Model } from 'sequelize-typescript';
export declare class TransactionEntity extends Model<TransactionEntity> {
    id: string;
    userId: string;
    shareId: string;
    type: string;
    amount: number;
    price: number;
}
export declare enum TransactionTypeEnum {
    BUY = "BUY",
    SELL = "SELL"
}
