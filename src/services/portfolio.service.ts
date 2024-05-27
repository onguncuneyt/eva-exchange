import { ForbiddenException, Injectable } from '@nestjs/common';
import { PortfolioCreateResponseDto } from '../dtos/portfolioDtos/responses/PortfolioCreateResponseDto';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { AddShareToPortfolioDto } from 'src/dtos/portfolioDtos/requests/AddShareToPortfolioRequest.dto';
import { BuyShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuyShareRequest.dto';
import { SellShareRequestDto } from '../dtos/portfolioDtos/requests/SellShareRequest.dto';
import { UserRepository } from 'src/dao/repositories/UserRepository';
import { PortfolioRepository } from '../dao/repositories/PortfolioRepository';
import { ShareRepository } from 'src/dao/repositories/ShareRepository';
import { PortfolioSharesRepository } from 'src/dao/repositories/PortfolioSharesRepository';
import { TransactionRepository } from '../dao/repositories/TransactionRepository';

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
    let createdPortfolio = await this.portfolioRepository.create({
      userId: user.sub,
    });

    return this.dtoMapperService.mapToDto(
      createdPortfolio.dataValues,
      PortfolioCreateResponseDto,
    );
  }

  async addShareToPortfolio(
    addShareToPortfolioDto: AddShareToPortfolioDto,
    currUser: any,
  ) {
    const { shareId } = addShareToPortfolioDto;
    const portfolio = await this.portfolioRepository.findOne(currUser);

    if (!portfolio) {
      throw new ForbiddenException('Portfolio not found');
    }

    const share = await this.shareRepository.findOne({
      where: { id: shareId },
    });

    if (!share) {
      throw new ForbiddenException('Share not found');
    }

    const existPortfolioShare = await this.portfolioSharesRepository.findOne(
      portfolio.id,
      shareId,
    );

    if (existPortfolioShare) {
      throw new ForbiddenException('Share is already in portfolio');
    }

    return await this.portfolioSharesRepository.create(
      portfolio.id,
      shareId,
      0,
    );
  }

  async buyShare(buyShareRequestDto: BuyShareRequestDto, currUser: any) {
    const { shareId, amount } = buyShareRequestDto;
    const { portfolio, share, user, existPortfolioShare } = await this.check(
      shareId,
      currUser.sub,
    );

    if (share.amount < amount) {
      throw new ForbiddenException('Not enough share');
    }

    if (user.balance < amount * share.rate) {
      throw new ForbiddenException('Not enough money');
    }

    await user.update({
      balance: user.balance - amount * share.rate,
    });

    await share.update({
      amount: share.amount - amount,
    });

    let transaction = await this.transactionRepository.buyCreate(
      buyShareRequestDto,
      share,
      currUser,
    );

    if (existPortfolioShare) {
      return await existPortfolioShare.update({
        amount: existPortfolioShare.amount + amount,
      });
    }

    return await this.portfolioSharesRepository.create(
      portfolio.id,
      shareId,
      amount,
    );
  }

  async check(shareId: string, userId: string) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId: userId },
    });

    if (!portfolio) {
      throw new ForbiddenException('Portfolio not found');
    }

    const share = await this.shareRepository.findOne({
      where: { id: shareId },
    });

    if (!share) {
      throw new ForbiddenException('Share not found');
    }

    const shareInPortfolio = await this.portfolioSharesRepository.findOne(
      portfolio.id,
      shareId,
    );

    if (!shareInPortfolio) {
      throw new ForbiddenException('Share not found in portfolio');
    }

    const user = await this.userRepository.findById(userId);

    const existPortfolioShare = await this.portfolioSharesRepository.findOne(
      portfolio.id,
      shareId,
    );

    if (!existPortfolioShare) {
      throw new ForbiddenException('Share not found in portfolio');
    }
    return { portfolio, share, user, existPortfolioShare };
  }

  async sellShare(sellShareRequestDto: SellShareRequestDto, currUser: any) {
    const { shareId, amount } = sellShareRequestDto;

    const { share, user, existPortfolioShare } = await this.check(
      shareId,
      currUser.sub,
    );

    if (existPortfolioShare.amount < amount) {
      throw new ForbiddenException('Not enough share');
    }

    const calculatedBalance = parseFloat(
      Number(Number(user.balance) + Number(amount * share.rate)).toFixed(2),
    );

    await user.update({
      balance: calculatedBalance,
    });

    await share.update({
      amount: share.amount + amount,
    });

    let transaction = await this.transactionRepository.sellCreate(
      sellShareRequestDto,
      share,
      currUser,
    );

    return await existPortfolioShare.update({
      amount: existPortfolioShare.amount - amount,
    });
  }

  async getAllPortfolio(currUser: any) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId: currUser.sub },
    });

    if (!portfolio) {
      throw new ForbiddenException('Portfolio not found');
    }

    const portfolioShares = await this.portfolioSharesRepository.findAllById(
      portfolio.id,
    );

    return await Promise.all(
      portfolioShares.map(async (portfolioShare) => {
        const share = await this.shareRepository.findOne(
          portfolioShare.shareId,
        );
        return {
          ...share.toJSON(),
          amount: portfolioShare.amount,
        };
      }),
    );
  }
}
