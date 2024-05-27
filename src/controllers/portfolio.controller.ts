import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../entities';
import { Request } from 'express';
import { BuyShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuyShareRequest.dto';
import { SellShareRequestDto } from 'src/dtos/portfolioDtos/requests/SellShareRequest.dto';
import { AddShareToPortfolioDto } from 'src/dtos/portfolioDtos/requests/AddShareToPortfolioRequest.dto';
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
      console.log(req.user);

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
    @Body() buyShareRequestDto: BuyShareRequestDto,
    @Req() req: Request,
  ) {
    return this.portfolioService.buyShare(buyShareRequestDto, req.user);
  }

  @Post('sell')
  @Roles(RoleEnum.USER)
  async sellSharePortfolio(
    @Body() sellSharePortfolio: SellShareRequestDto,
    @Req() req: Request,
  ) {
    return this.portfolioService.sellShare(sellSharePortfolio, req.user);
  }

  @Post('add')
  @Roles(RoleEnum.USER)
  async addShareInPortfolio(
    @Body() addShareInPortfolio: AddShareToPortfolioDto,
    @Req() req: Request,
  ) {
    return this.portfolioService.addShareToPortfolio(
      addShareInPortfolio,
      req.user,
    );
  }

  @Get('all')
  @Roles(RoleEnum.USER)
  async getAllPortfolio(@Req() req: Request) {
    return this.portfolioService.getAllPortfolio(req.user);
  }
}
