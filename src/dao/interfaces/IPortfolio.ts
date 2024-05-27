import { PortfolioEntity } from 'src/entities';

export interface IPortfolio {
  create(user: any): Promise<PortfolioEntity>;

  findOne(user: any): Promise<PortfolioEntity>;
}
