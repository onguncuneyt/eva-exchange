import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../entities';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { TransactionService } from 'src/services/transaction.service';
import { Request } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly resultHelper: ResultHelper,
  ) {}

  @Get('all-transactions')
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async getAll() {
    try {
      const transactionResponse =
        await this.transactionService.getAllTransactions();
      return this.resultHelper.successData(transactionResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('user-transactions')
  @Roles(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async getUsersAll(@Req() req: Request) {
    try {
      const transactionResponse =
        await this.transactionService.getUsersAllTransactions(req.user);
      return this.resultHelper.successData(transactionResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
