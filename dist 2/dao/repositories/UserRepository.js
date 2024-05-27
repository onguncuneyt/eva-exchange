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
exports.UserRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const entities_1 = require("../../entities");
const email_exist_exception_1 = require("../../core/exceptions/email-exist.exception");
const argon2 = require("argon2");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    findById(userId) {
        return this.userModel.findByPk(userId);
    }
    async findByEmail(email) {
        return await this.userModel.findOne({
            where: { email },
        });
    }
    async create(item) {
        const { password, email } = item;
        const userWithSameCredentials = await this.userModel.findOne({
            where: { email },
        });
        if (userWithSameCredentials) {
            throw new email_exist_exception_1.EmailExsitException();
        }
        const hashedPassword = await argon2.hash(password);
        return await this.userModel.create({
            email,
            password: hashedPassword,
        });
    }
    update(item) {
        throw new Error('Method not implemented.');
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(entities_1.UserEntity)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
//# sourceMappingURL=UserRepository.js.map