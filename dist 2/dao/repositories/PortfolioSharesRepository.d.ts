import { PortfolioSharesEntity } from 'src/entities';
import { IPortfolioShares } from '../interfaces/IPortfolioShares';
export declare class PortfolioSharesRepository implements IPortfolioShares {
    private readonly portfolioSharesModel;
    constructor(portfolioSharesModel: typeof PortfolioSharesEntity);
    findAllById(portfolioId: any): Promise<PortfolioSharesEntity[]>;
    create(portfolioId: any, shareId: any, amount: number): Promise<PortfolioSharesEntity>;
    findOne(portfolioId: any, shareId: any): Promise<PortfolioSharesEntity>;
}
