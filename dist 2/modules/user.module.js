"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_controller_1 = require("../controllers/user.controller");
const UserRepository_1 = require("../dao/repositories/UserRepository");
const entities_1 = require("../entities");
const user_service_1 = require("../services/user.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([entities_1.UserEntity])],
        controllers: [user_controller_1.UsersController],
        providers: [user_service_1.UsersService, UserRepository_1.UserRepository],
        exports: [UserRepository_1.UserRepository],
    })
], UsersModule);
//# sourceMappingURL=user.module.js.map