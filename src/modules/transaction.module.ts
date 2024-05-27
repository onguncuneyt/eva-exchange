import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionEntity } from '../entities';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { TransactionController } from 'src/controllers/transaction.controller';
import { TransactionService } from 'src/services/transaction.service';
import { TransactionRepository } from 'src/dao/repositories/TransactionRepository';

@Module({
  imports: [SequelizeModule.forFeature([TransactionEntity])],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, ResultHelper],
  exports: [TransactionRepository],
})
export class TransactionModule {}
