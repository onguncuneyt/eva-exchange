import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  PortfolioEntity,
  PortfolioSharesEntity,
  ShareEntity,
  TransactionEntity,
  UserEntity,
} from '../entities';
import { PortfolioController } from '../controllers/portfolio.controller';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioRepository } from 'src/dao/repositories/PortfolioRepository';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { ShareRepository } from 'src/dao/repositories/ShareRepository';
import { TransactionRepository } from 'src/dao/repositories/TransactionRepository';
import { PortfolioSharesRepository } from 'src/dao/repositories/PortfolioSharesRepository';
import { UserRepository } from 'src/dao/repositories/UserRepository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserEntity,
      ShareEntity,
      PortfolioEntity,
      PortfolioSharesEntity,
      TransactionEntity,
    ]),
  ],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    PortfolioRepository,
    ShareRepository,
    TransactionRepository,
    PortfolioSharesRepository,
    UserRepository,
    DtoMapperService,
    ResultHelper,
  ],
  exports: [
    PortfolioRepository,
    ShareRepository,
    TransactionRepository,
    PortfolioSharesRepository,
    UserRepository,
  ],
})
export class PortfolioModule {}
