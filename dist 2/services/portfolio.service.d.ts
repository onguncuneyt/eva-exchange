import { PortfolioEntity, PortfolioSharesEntity, ShareEntity, UserEntity } from '../entities';
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
export declare class PortfolioService {
    private readonly portfolioRepository;
    private readonly shareRepository;
    private readonly portfolioSharesRepository;
    private readonly transactionRepository;
    private readonly userRepository;
    private readonly dtoMapperService;
    constructor(portfolioRepository: PortfolioRepository, shareRepository: ShareRepository, portfolioSharesRepository: PortfolioSharesRepository, transactionRepository: TransactionRepository, userRepository: UserRepository, dtoMapperService: DtoMapperService);
    createPortfolio(user: any): Promise<PortfolioCreateResponseDto>;
    addShareToPortfolio(addShareToPortfolioDto: AddShareToPortfolioDto, currUser: any): Promise<PortfolioSharesEntity>;
    buyShare(buyShareRequestDto: BuyShareRequestDto, currUser: any): Promise<PortfolioSharesEntity>;
    check(shareId: string, userId: string): Promise<{
        portfolio: PortfolioEntity;
        share: ShareEntity;
        user: UserEntity;
        existPortfolioShare: PortfolioSharesEntity;
    }>;
    sellShare(sellShareRequestDto: SellShareRequestDto, currUser: any): Promise<PortfolioSharesEntity>;
    getAllPortfolio(currUser: any): Promise<{
        amount: number;
        id: string;
        name: string;
        symbol: string;
        rate: number;
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: ShareEntity;
        dataValues: ShareEntity;
        _creationAttributes: ShareEntity;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<ShareEntity, ShareEntity>;
    }[]>;
}
