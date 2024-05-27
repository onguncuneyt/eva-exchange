import { PortfolioEntity, ShareEntity } from 'src/entities';

export class PortfolioSharesResponseDto {
  constructor(portfolio: PortfolioEntity, shares: ShareEntity[]) {
    this.portfolio = portfolio;
    this.shares = shares;
  }
  portfolio: PortfolioEntity;
  shares: ShareEntity[];
}
