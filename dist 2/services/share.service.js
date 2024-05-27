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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareService = void 0;
const common_1 = require("@nestjs/common");
const dto_mapper_util_1 = require("../core/utils/dto-mapper.util");
const ShareCreateResponse_dto_1 = require("../dtos/shareDtos/responses/ShareCreateResponse.dto");
const ShareUpdateResponse_dto_1 = require("../dtos/shareDtos/responses/ShareUpdateResponse.dto");
const ShareRepository_1 = require("../dao/repositories/ShareRepository");
let ShareService = class ShareService {
    constructor(shareRepository, dtoMapperService) {
        this.shareRepository = shareRepository;
        this.dtoMapperService = dtoMapperService;
    }
    async createShare(createShareDto) {
        const { symbol, ...rest } = createShareDto;
        const createdShare = await this.shareRepository.create({ ...rest, symbol });
        return this.dtoMapperService.mapToDto(createdShare.dataValues, ShareCreateResponse_dto_1.CreateShareResponseDto);
    }
    async updateShare(updateShareDto) {
        const updatedShare = await this.shareRepository.update(updateShareDto);
        return this.dtoMapperService.mapToDto(updatedShare.dataValues, ShareUpdateResponse_dto_1.ShareUpdateResponseDto);
    }
    async findShares() {
        let shares = await this.shareRepository.findAll();
        return shares;
    }
};
exports.ShareService = ShareService;
exports.ShareService = ShareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ShareRepository_1.ShareRepository,
        dto_mapper_util_1.DtoMapperService])
], ShareService);
//# sourceMappingURL=share.service.js.map