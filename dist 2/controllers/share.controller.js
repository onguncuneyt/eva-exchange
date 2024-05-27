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
exports.ShareController = void 0;
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../auth/decorators/role.decorator");
const entities_1 = require("../entities");
const share_service_1 = require("../services/share.service");
const ShareCreateRequest_dto_1 = require("../dtos/shareDtos/requests/ShareCreateRequest.dto");
const ShareUpdateRequest_dto_1 = require("../dtos/shareDtos/requests/ShareUpdateRequest.dto");
const result_helper_util_1 = require("../core/utils/result-helper.util");
let ShareController = class ShareController {
    constructor(shareService, resultHelper) {
        this.shareService = shareService;
        this.resultHelper = resultHelper;
    }
    async createShare(createShareDto) {
        try {
            const shareResponse = await this.shareService.createShare(createShareDto);
            return this.resultHelper.created(shareResponse);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateUser(updateShareDto) {
        try {
            const shareResponse = await this.shareService.updateShare(updateShareDto);
            return this.resultHelper.created(shareResponse);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findAll() {
        try {
            const shareResponse = await this.shareService.findShares();
            return this.resultHelper.created(shareResponse);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.ShareController = ShareController;
__decorate([
    (0, common_1.Post)('create'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.ADMIN, entities_1.RoleEnum.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ShareCreateRequest_dto_1.CreateShareDto]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "createShare", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.ADMIN, entities_1.RoleEnum.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ShareUpdateRequest_dto_1.UpdateShareDto]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, role_decorator_1.Roles)(entities_1.RoleEnum.USER, entities_1.RoleEnum.ADMIN, entities_1.RoleEnum.SUPER_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "findAll", null);
exports.ShareController = ShareController = __decorate([
    (0, common_1.Controller)('share'),
    __metadata("design:paramtypes", [share_service_1.ShareService,
        result_helper_util_1.ResultHelper])
], ShareController);
//# sourceMappingURL=share.controller.js.map