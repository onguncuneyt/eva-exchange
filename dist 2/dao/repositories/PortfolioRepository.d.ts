import { PortfolioEntity, PortfolioSharesEntity, ShareEntity, TransactionEntity, UserEntity } from 'src/entities';
import { IPortfolio } from '../interfaces/IPortfolio';
export declare class PortfolioRepository implements IPortfolio {
    private readonly portfolioModel;
    private readonly portfolioSharesModel;
    private readonly shareModel;
    private readonly userModel;
    private readonly transactionModel;
    constructor(portfolioModel: typeof PortfolioEntity, portfolioSharesModel: typeof PortfolioSharesEntity, shareModel: typeof ShareEntity, userModel: typeof UserEntity, transactionModel: typeof TransactionEntity);
    create(user: any): Promise<PortfolioEntity>;
    findOne(user: any): Promise<PortfolioEntity>;
}
