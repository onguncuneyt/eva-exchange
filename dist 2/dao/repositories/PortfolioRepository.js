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
exports.PortfolioRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const entities_1 = require("../../entities");
const common_1 = require("@nestjs/common");
let PortfolioRepository = class PortfolioRepository {
    constructor(portfolioModel, portfolioSharesModel, shareModel, userModel, transactionModel) {
        this.portfolioModel = portfolioModel;
        this.portfolioSharesModel = portfolioSharesModel;
        this.shareModel = shareModel;
        this.userModel = userModel;
        this.transactionModel = transactionModel;
    }
    async create(user) {
        return await this.portfolioModel.create({
            userId: user.sub,
        });
    }
    async findOne(user) {
        return await this.portfolioModel.findOne({
            where: { userId: user.sub },
        });
    }
};
exports.PortfolioRepository = PortfolioRepository;
exports.PortfolioRepository = PortfolioRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(entities_1.PortfolioEntity)),
    __param(1, (0, sequelize_1.InjectModel)(entities_1.PortfolioSharesEntity)),
    __param(2, (0, sequelize_1.InjectModel)(entities_1.ShareEntity)),
    __param(3, (0, sequelize_1.InjectModel)(entities_1.UserEntity)),
    __param(4, (0, sequelize_1.InjectModel)(entities_1.TransactionEntity)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], PortfolioRepository);
//# sourceMappingURL=PortfolioRepository.js.map