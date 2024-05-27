import { ForbiddenException, Injectable } from '@nestjs/common';
import { PortfolioCreateResponseDto } from '../dtos/portfolioDtos/responses/PortfolioCreateResponseDto';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { BuySellShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuySellShareRequest.dto';
import { UserRepository } from 'src/dao/repositories/UserRepository';
import { PortfolioRepository } from '../dao/repositories/PortfolioRepository';
import { ShareRepository } from 'src/dao/repositories/ShareRepository';
import { PortfolioSharesRepository } from 'src/dao/repositories/PortfolioSharesRepository';
import { TransactionRepository } from '../dao/repositories/TransactionRepository';
import { PortfolioSharesResponseDto } from '../dtos/portfolioDtos/responses/PortfolioSharesResponse.Dto';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly shareRepository: ShareRepository,
    private readonly portfolioSharesRepository: PortfolioSharesRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly dtoMapperService: DtoMapperService,
  ) {}

  async createPortfolio(user: any): Promise<PortfolioCreateResponseDto> {
    console.log(user.sub);
    let createdPortfolio = await this.portfolioRepository.create({
      userId: user.sub,
    });

    return this.dtoMapperService.mapToDto(
      createdPortfolio.dataValues,
      PortfolioCreateResponseDto,
    );
  }

  async buyShare(
    buySellShareRequestDto: BuySellShareRequestDto,
    currUser: any,
  ) {
    const { shareId, amount } = buySellShareRequestDto;
    const { portfolio, share, user, existPortfolioShare } = await this.check(
      shareId,
      currUser.sub,
    );

    if (share.amount < amount || share.amount === 0 || share.amount < 0) {
      throw new ForbiddenException('Not enough share');
    }

    if (user.balance < amount * share.rate) {
      throw new ForbiddenException('Not enough money');
    }

    await user.update({
      balance: Number(user.balance) - Number(amount) * Number(share.rate),
    });

    await share.update({
      amount: Number(share.amount) - Number(amount),
    });

    await this.transactionRepository.buyCreate(
      buySellShareRequestDto,
      share,
      currUser,
    );

    if (existPortfolioShare) {
      return await existPortfolioShare.update({
        amount: Number(existPortfolioShare.amount) + Number(amount),
      });
    }

    return await this.portfolioSharesRepository.create(
      portfolio.id,
      shareId,
      amount,
    );
  }

  async check(shareId: string, userId: string) {
    const portfolio = await this.portfolioRepository.findById(userId);

    if (!portfolio) {
      throw new ForbiddenException('Portfolio not found');
    }

    const share = await this.shareRepository.findOne(shareId);

    if (!share) {
      throw new ForbiddenException('Share not found');
    }

    const user = await this.userRepository.findById(userId);

    const existPortfolioShare = await this.portfolioSharesRepository.findOne(
      portfolio.id,
      shareId,
    );

    return { portfolio, share, user, existPortfolioShare };
  }

  async sellShare(
    buySellShareRequestDto: BuySellShareRequestDto,
    currUser: any,
  ) {
    const { shareId, amount } = buySellShareRequestDto;

    const { share, user, existPortfolioShare } = await this.check(
      shareId,
      currUser.sub,
    );

    if (
      existPortfolioShare.amount < amount ||
      existPortfolioShare.amount === 0 ||
      existPortfolioShare.amount < 0
    ) {
      throw new ForbiddenException('Not enough share');
    }

    const calculatedBalance = parseFloat(
      Number(Number(user.balance) + Number(amount * share.rate)).toFixed(2),
    );

    await user.update({
      balance: calculatedBalance,
    });

    await share.update({
      amount: Number(share.amount) + Number(amount),
    });

    await this.transactionRepository.sellCreate(
      buySellShareRequestDto,
      share,
      currUser,
    );

    return await existPortfolioShare.update({
      amount: Number(existPortfolioShare.amount) - Number(amount),
    });
  }

  async getAllPortfolio(currUser: any) {
    const portfolio = await this.portfolioRepository.findAllById(currUser.sub);

    if (!portfolio) {
      throw new ForbiddenException('Portfolio not found');
    }

    let portfolioSharesList: PortfolioSharesResponseDto[] = [];
    const portfolioShares = [];
    for (const portfolioItem of portfolio) {
      portfolioShares.push(
        await this.portfolioSharesRepository.findAllById(portfolioItem.id),
      );
      portfolioSharesList.push({
        portfolio: portfolioItem,
        shares: portfolioShares,
      });
    }
    return portfolioSharesList;
  }

  async listAllPortfolios(user: any) {
    return await this.portfolioRepository.findAllById(user.sub);
  }
}
