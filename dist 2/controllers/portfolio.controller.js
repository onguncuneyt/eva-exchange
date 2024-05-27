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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("../services/portfolio.service");
const role_decorator_1 = require("../auth/decorators/role.decorator");
const entities_1 = require("../entities");
const BuyShareRequest_dto_1 = require("../dtos/portfolioDtos/requests/BuyShareRequest.dto");
const SellShareRequest_dto_1 = require("../dtos/portfolioDtos/requests/SellShareRequest.dto");
const AddShareToPortfolioRequest_dto_1 = require("../dtos/portfolioDtos/requests/AddShareToPortfolioRequest.dto");
const result_helper_util_1 = require("../core/utils/result-helper.util");
let PortfolioController = class PortfolioController {
    constructor(portfolioService, resultHelper) {
        this.portfolioService = portfolioService;
        this.resultHelper = resultHelper;
    }
    async createPortfolio(req) {
        try {
            console.log(req.user);
            const portfolioResponse = await this.portfolioService.createPortfolio(req.user);
            return this.resultHelper.created(portfolioResponse);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async addInPortfolio(buyShareRequestDto, req) {
        return this.portfolioService.buyShare(buyShareRequestDto, req.user);
    }
    async sellSharePortfolio(sellSharePortfolio, req) {
        return this.portfolioService.sellShare(sellSharePortfolio, req.user);
    }
    async addShareInPortfolio(addShareInPortfolio, req) {
        return this.portfolioService.addShareToPortfolio(addShareInPortfolio, req.user);
    }
    async getAllPortfolio(req) {
        return this.portfolioService.getAllPortfolio(req.user);
    }
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, common_1.Post)('create'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.USER),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createPortfolio", null);
__decorate([
    (0, common_1.Post)('buy'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BuyShareRequest_dto_1.BuyShareRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "addInPortfolio", null);
__decorate([
    (0, common_1.Post)('sell'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SellShareRequest_dto_1.SellShareRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "sellSharePortfolio", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddShareToPortfolioRequest_dto_1.AddShareToPortfolioDto, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "addShareInPortfolio", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.USER),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAllPortfolio", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('portfolio'),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService,
        result_helper_util_1.ResultHelper])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map