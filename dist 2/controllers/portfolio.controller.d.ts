import { PortfolioService } from '../services/portfolio.service';
import { Request } from 'express';
import { BuyShareRequestDto } from 'src/dtos/portfolioDtos/requests/BuyShareRequest.dto';
import { SellShareRequestDto } from 'src/dtos/portfolioDtos/requests/SellShareRequest.dto';
import { AddShareToPortfolioDto } from 'src/dtos/portfolioDtos/requests/AddShareToPortfolioRequest.dto';
import { PortfolioCreateResponseDto } from 'src/dtos/portfolioDtos/responses/PortfolioCreateResponseDto';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { ResultData } from 'src/core/results/result-data.result';
export declare class PortfolioController {
    private readonly portfolioService;
    private readonly resultHelper;
    constructor(portfolioService: PortfolioService, resultHelper: ResultHelper);
    createPortfolio(req: Request): Promise<ResultData<PortfolioCreateResponseDto>>;
    addInPortfolio(buyShareRequestDto: BuyShareRequestDto, req: Request): Promise<import("../entities").PortfolioSharesEntity>;
    sellSharePortfolio(sellSharePortfolio: SellShareRequestDto, req: Request): Promise<import("../entities").PortfolioSharesEntity>;
    addShareInPortfolio(addShareInPortfolio: AddShareToPortfolioDto, req: Request): Promise<import("../entities").PortfolioSharesEntity>;
    getAllPortfolio(req: Request): Promise<{
        amount: number;
        id: string;
        name: string;
        symbol: string;
        rate: number;
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: import("../entities").ShareEntity;
        dataValues: import("../entities").ShareEntity;
        _creationAttributes: import("../entities").ShareEntity;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../entities").ShareEntity, import("../entities").ShareEntity>;
    }[]>;
}
