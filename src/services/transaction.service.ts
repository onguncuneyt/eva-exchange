import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/dao/repositories/TransactionRepository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getAllTransactions() {
    let transactions = await this.transactionRepository.listAllTransactions();
    return transactions;
  }

  async getUsersAllTransactions(user: any) {
    let transactions =
      await this.transactionRepository.listUsersAllTransactions(user);
    return transactions;
  }
}
