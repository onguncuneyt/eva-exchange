import { CreateShareDto } from '../dtos/shareDtos/requests/ShareCreateRequest.dto';
import { UpdateShareDto } from '../dtos/shareDtos/requests/ShareUpdateRequest.dto';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { CreateShareResponseDto } from 'src/dtos/shareDtos/responses/ShareCreateResponse.dto';
import { ShareRepository } from 'src/dao/repositories/ShareRepository';
export declare class ShareService {
    private readonly shareRepository;
    private readonly dtoMapperService;
    constructor(shareRepository: ShareRepository, dtoMapperService: DtoMapperService);
    createShare(createShareDto: CreateShareDto): Promise<CreateShareResponseDto>;
    updateShare(updateShareDto: UpdateShareDto): Promise<CreateShareResponseDto>;
    findShares(): Promise<import("../entities").ShareEntity[]>;
}
