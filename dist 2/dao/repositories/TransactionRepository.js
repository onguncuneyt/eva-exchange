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
exports.TransactionRepository = void 0;
const entities_1 = require("../../entities");
const sequelize_1 = require("@nestjs/sequelize");
let TransactionRepository = class TransactionRepository {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }
    async sellCreate(sellShareRequestDto, share, currUser) {
        return await this.transactionModel.create({
            userId: currUser.sub,
            shareId: sellShareRequestDto.shareId,
            amount: sellShareRequestDto.amount,
            price: share.rate,
            type: sellShareRequestDto.type,
        });
    }
    async buyCreate(buyShareRequestDto, share, currUser) {
        return await this.transactionModel.create({
            userId: currUser.sub,
            shareId: buyShareRequestDto.shareId,
            amount: buyShareRequestDto.amount,
            price: share.rate,
            type: buyShareRequestDto.type,
        });
    }
};
exports.TransactionRepository = TransactionRepository;
exports.TransactionRepository = TransactionRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(entities_1.TransactionEntity)),
    __metadata("design:paramtypes", [Object])
], TransactionRepository);
//# sourceMappingURL=TransactionRepository.js.map