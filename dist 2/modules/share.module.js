"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const entities_1 = require("../entities");
const share_controller_1 = require("../controllers/share.controller");
const share_service_1 = require("../services/share.service");
const ShareRepository_1 = require("../dao/repositories/ShareRepository");
const dto_mapper_util_1 = require("../core/utils/dto-mapper.util");
const result_helper_util_1 = require("../core/utils/result-helper.util");
let ShareModule = class ShareModule {
};
exports.ShareModule = ShareModule;
exports.ShareModule = ShareModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([entities_1.ShareEntity])],
        controllers: [share_controller_1.ShareController],
        providers: [share_service_1.ShareService, ShareRepository_1.ShareRepository, dto_mapper_util_1.DtoMapperService, result_helper_util_1.ResultHelper],
        exports: [ShareRepository_1.ShareRepository],
    })
], ShareModule);
//# sourceMappingURL=share.module.js.map