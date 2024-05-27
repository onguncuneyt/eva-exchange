import { PortfolioSharesEntity } from 'src/entities';
export interface IPortfolioShares {
    findOne(portfolioId: any, shareId: any): Promise<PortfolioSharesEntity>;
    create(portfolioId: any, shareId: any, amount: number): Promise<PortfolioSharesEntity>;
    findAllById(portfolioId: any): Promise<PortfolioSharesEntity[]>;
}
