import { Model } from 'sequelize-typescript';
export declare class PortfolioSharesEntity extends Model<PortfolioSharesEntity> {
    id: string;
    portfolioId: string;
    shareId: string;
    amount: number;
}
