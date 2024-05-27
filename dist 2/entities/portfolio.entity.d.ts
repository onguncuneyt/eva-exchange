import { Model } from 'sequelize-typescript';
export declare class PortfolioEntity extends Model<PortfolioEntity> {
    id: string;
    userId: string;
    shares: string[];
}
