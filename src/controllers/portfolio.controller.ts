import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../entities';
import { Request } from 'express';
import { BuySellShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuySellShareRequest.dto';
import { PortfolioCreateResponseDto } from 'src/dtos/portfolioDtos/responses/PortfolioCreateResponseDto';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { ResultData } from 'src/core/results/result-data.result';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly resultHelper: ResultHelper,
  ) {}

  @Post('create')
  @Roles(RoleEnum.USER)
  async createPortfolio(
    @Req() req: Request,
  ): Promise<ResultData<PortfolioCreateResponseDto>> {
    try {
      const portfolioResponse = await this.portfolioService.createPortfolio(
        req.user,
      );
      return this.resultHelper.created(portfolioResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('buy')
  @Roles(RoleEnum.USER)
  async addInPortfolio(
    @Body() buySellShareRequestDto: BuySellShareRequestDto,
    @Req() req: Request,
  ) {
    try {
      return this.portfolioService.buyShare(buySellShareRequestDto, req.user);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('sell')
  @Roles(RoleEnum.USER)
  async sellSharePortfolio(
    @Body() buySellShareRequestDto: BuySellShareRequestDto,
    @Req() req: Request,
  ) {
    try {
      return this.portfolioService.sellShare(buySellShareRequestDto, req.user);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('portfolio-shares')
  @Roles(RoleEnum.USER)
  async getAllPortfolioShares(@Req() req: Request) {
    try {
      return this.portfolioService.getAllPortfolio(req.user);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('list-portfolios')
  @Roles(RoleEnum.USER)
  async getAllPortfolios(@Req() req: Request) {
    try {
      return this.portfolioService.listAllPortfolios(req.user);
    } catch (error) {
      console.log(error);
    }
  }
}
