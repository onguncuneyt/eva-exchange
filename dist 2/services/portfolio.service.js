"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const PortfolioCreateResponseDto_1 = require("../dtos/portfolioDtos/responses/PortfolioCreateResponseDto");
const dto_mapper_util_1 = require("../core/utils/dto-mapper.util");
const UserRepository_1 = require("../dao/repositories/UserRepository");
const PortfolioRepository_1 = require("../dao/repositories/PortfolioRepository");
const ShareRepository_1 = require("../dao/repositories/ShareRepository");
const PortfolioSharesRepository_1 = require("../dao/repositories/PortfolioSharesRepository");
const TransactionRepository_1 = require("../dao/repositories/TransactionRepository");
let PortfolioService = class PortfolioService {
    constructor(portfolioRepository, shareRepository, portfolioSharesRepository, transactionRepository, userRepository, dtoMapperService) {
        this.portfolioRepository = portfolioRepository;
        this.shareRepository = shareRepository;
        this.portfolioSharesRepository = portfolioSharesRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.dtoMapperService = dtoMapperService;
    }
    async createPortfolio(user) {
        let createdPortfolio = await this.portfolioRepository.create({
            userId: user.sub,
        });
        return this.dtoMapperService.mapToDto(createdPortfolio.dataValues, PortfolioCreateResponseDto_1.PortfolioCreateResponseDto);
    }
    async addShareToPortfolio(addShareToPortfolioDto, currUser) {
        const { shareId } = addShareToPortfolioDto;
        const portfolio = await this.portfolioRepository.findOne(currUser);
        if (!portfolio) {
            throw new common_1.ForbiddenException('Portfolio not found');
        }
        const share = await this.shareRepository.findOne({
            where: { id: shareId },
        });
        if (!share) {
            throw new common_1.ForbiddenException('Share not found');
        }
        const existPortfolioShare = await this.portfolioSharesRepository.findOne(portfolio.id, shareId);
        if (existPortfolioShare) {
            throw new common_1.ForbiddenException('Share is already in portfolio');
        }
        return await this.portfolioSharesRepository.create(portfolio.id, shareId, 0);
    }
    async buyShare(buyShareRequestDto, currUser) {
        const { shareId, amount } = buyShareRequestDto;
        const { portfolio, share, user, existPortfolioShare } = await this.check(shareId, currUser.sub);
        if (share.amount < amount) {
            throw new common_1.ForbiddenException('Not enough share');
        }
        if (user.balance < amount * share.rate) {
            throw new common_1.ForbiddenException('Not enough money');
        }
        await user.update({
            balance: user.balance - amount * share.rate,
        });
        await share.update({
            amount: share.amount - amount,
        });
        let transaction = await this.transactionRepository.buyCreate(buyShareRequestDto, share, currUser);
        if (existPortfolioShare) {
            return await existPortfolioShare.update({
                amount: existPortfolioShare.amount + amount,
            });
        }
        return await this.portfolioSharesRepository.create(portfolio.id, shareId, amount);
    }
    async check(shareId, userId) {
        const portfolio = await this.portfolioRepository.findOne({
            where: { userId: userId },
        });
        if (!portfolio) {
            throw new common_1.ForbiddenException('Portfolio not found');
        }
        const share = await this.shareRepository.findOne({
            where: { id: shareId },
        });
        if (!share) {
            throw new common_1.ForbiddenException('Share not found');
        }
        const shareInPortfolio = await this.portfolioSharesRepository.findOne(portfolio.id, shareId);
        if (!shareInPortfolio) {
            throw new common_1.ForbiddenException('Share not found in portfolio');
        }
        const user = await this.userRepository.findById(userId);
        const existPortfolioShare = await this.portfolioSharesRepository.findOne(portfolio.id, shareId);
        if (!existPortfolioShare) {
            throw new common_1.ForbiddenException('Share not found in portfolio');
        }
        return { portfolio, share, user, existPortfolioShare };
    }
    async sellShare(sellShareRequestDto, currUser) {
        const { shareId, amount } = sellShareRequestDto;
        const { share, user, existPortfolioShare } = await this.check(shareId, currUser.sub);
        if (existPortfolioShare.amount < amount) {
            throw new common_1.ForbiddenException('Not enough share');
        }
        const calculatedBalance = parseFloat(Number(Number(user.balance) + Number(amount * share.rate)).toFixed(2));
        await user.update({
            balance: calculatedBalance,
        });
        await share.update({
            amount: share.amount + amount,
        });
        let transaction = await this.transactionRepository.sellCreate(sellShareRequestDto, share, currUser);
        return await existPortfolioShare.update({
            amount: existPortfolioShare.amount - amount,
        });
    }
    async getAllPortfolio(currUser) {
        const portfolio = await this.portfolioRepository.findOne({
            where: { userId: currUser.sub },
        });
        if (!portfolio) {
            throw new common_1.ForbiddenException('Portfolio not found');
        }
        const portfolioShares = await this.portfolioSharesRepository.findAllById(portfolio.id);
        return await Promise.all(portfolioShares.map(async (portfolioShare) => {
            const share = await this.shareRepository.findOne(portfolioShare.shareId);
            return {
                ...share.toJSON(),
                amount: portfolioShare.amount,
            };
        }));
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(PortfolioRepository_1.PortfolioRepository)),
    __param(1, (0, sequelize_1.InjectModel)(ShareRepository_1.ShareRepository)),
    __param(2, (0, sequelize_1.InjectModel)(PortfolioSharesRepository_1.PortfolioSharesRepository)),
    __param(3, (0, sequelize_1.InjectModel)(TransactionRepository_1.TransactionRepository)),
    __param(4, (0, sequelize_1.InjectModel)(UserRepository_1.UserRepository)),
    __param(5, (0, sequelize_1.InjectModel)(dto_mapper_util_1.DtoMapperService)),
    __metadata("design:paramtypes", [PortfolioRepository_1.PortfolioRepository,
        ShareRepository_1.ShareRepository,
        PortfolioSharesRepository_1.PortfolioSharesRepository,
        TransactionRepository_1.TransactionRepository,
        UserRepository_1.UserRepository,
        dto_mapper_util_1.DtoMapperService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map