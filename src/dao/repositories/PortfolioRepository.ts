import { IUser } from '../interfaces/IUser';
import { UserUpdateRequestDto } from 'src/dtos/userDtos/requests/UserUpdateRequest.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  PortfolioEntity,
  PortfolioSharesEntity,
  ShareEntity,
  TransactionEntity,
  UserEntity,
} from 'src/entities';
import { Injectable } from '@nestjs/common';
import { IPortfolio } from '../interfaces/IPortfolio';
import { AddShareToPortfolioDto } from 'src/dtos/portfolioDtos/requests/AddShareToPortfolioRequest.dto';

@Injectable()
export class PortfolioRepository implements IPortfolio {
  constructor(
    @InjectModel(PortfolioEntity)
    private readonly portfolioModel: typeof PortfolioEntity,

    @InjectModel(PortfolioSharesEntity)
    private readonly portfolioSharesModel: typeof PortfolioSharesEntity,

    @InjectModel(ShareEntity)
    private readonly shareModel: typeof ShareEntity,

    @InjectModel(UserEntity)
    private readonly userModel: typeof UserEntity,

    @InjectModel(TransactionEntity)
    private readonly transactionModel: typeof TransactionEntity,
  ) {}
  async create(user: any): Promise<PortfolioEntity> {
    return await this.portfolioModel.create(user);
  }

  async findOne(user: any) {
    return await this.portfolioModel.findOne({
      where: { userId: user.sub },
    });
  }

  async findById(userId: any) {
    return await this.portfolioModel.findOne({
      where: { userId: userId },
    });
  }

  async findAllById(userId: any) {
    return await this.portfolioModel.findAll({
      where: { userId: userId },
    });
  }
}
