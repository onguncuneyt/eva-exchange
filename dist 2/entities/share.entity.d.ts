import { Model } from 'sequelize-typescript';
export declare class ShareEntity extends Model<ShareEntity> {
    id: string;
    name: string;
    symbol: string;
    amount: number;
    rate: number;
}
