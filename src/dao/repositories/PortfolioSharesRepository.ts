import { PortfolioSharesEntity } from 'src/entities';
import { IPortfolioShares } from '../interfaces/IPortfolioShares';
import { InjectModel } from '@nestjs/sequelize';

export class PortfolioSharesRepository implements IPortfolioShares {
  constructor(
    @InjectModel(PortfolioSharesEntity)
    private readonly portfolioSharesModel: typeof PortfolioSharesEntity,
  ) {}
  async findAllById(portfolioId: any): Promise<PortfolioSharesEntity[]> {
    return await this.portfolioSharesModel.findAll({
      where: { portfolioId },
    });
  }
  async create(
    portfolioId: any,
    shareId: any,
    amount: number,
  ): Promise<PortfolioSharesEntity> {
    return await this.portfolioSharesModel.create({
      portfolioId,
      shareId,
      amount,
    });
  }
  async findOne(
    portfolioId: any,
    shareId: any,
  ): Promise<PortfolioSharesEntity> {
    return await this.portfolioSharesModel.findOne({
      where: { portfolioId, shareId },
    });
  }
}
