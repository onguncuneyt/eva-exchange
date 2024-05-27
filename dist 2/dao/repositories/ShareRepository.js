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
exports.ShareRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const entities_1 = require("../../entities");
const common_1 = require("@nestjs/common");
const share_exist_exception_1 = require("../../core/exceptions/share-exist.exception");
const not_found_exception_1 = require("../../core/exceptions/not-found.exception");
let ShareRepository = class ShareRepository {
    constructor(shareModel) {
        this.shareModel = shareModel;
    }
    async create(item) {
        const { name, symbol, amount, rate } = item;
        const upperCaseSymbol = symbol.toUpperCase();
        const shareWithSameSymbol = await this.shareModel.findOne({
            where: { symbol: upperCaseSymbol },
        });
        if (shareWithSameSymbol) {
            throw new share_exist_exception_1.ShareExistException();
        }
        return await this.shareModel.create({
            name,
            symbol: upperCaseSymbol,
            amount,
            rate,
        });
    }
    async update(item) {
        const { symbol, rate } = item;
        let symbolUpper = symbol.toUpperCase();
        const share = await this.shareModel.findOne({
            where: { symbol: symbolUpper },
        });
        if (!share) {
            throw new not_found_exception_1.NotFoundException();
        }
        share.rate = rate;
        let returnValue = await this.shareModel.update(share.dataValues, {
            returning: true,
            where: { symbol: symbolUpper },
        });
        return returnValue[1][0];
    }
    findAll() {
        return this.shareModel.findAll();
    }
    async findOne(shareId) {
        return await this.shareModel.findOne({
            where: { id: shareId },
        });
    }
};
exports.ShareRepository = ShareRepository;
exports.ShareRepository = ShareRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(entities_1.ShareEntity)),
    __metadata("design:paramtypes", [Object])
], ShareRepository);
//# sourceMappingURL=ShareRepository.js.map