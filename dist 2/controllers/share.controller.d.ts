import { ShareService } from '../services/share.service';
import { CreateShareDto } from '../dtos/shareDtos/requests/ShareCreateRequest.dto';
import { UpdateShareDto } from '../dtos/shareDtos/requests/ShareUpdateRequest.dto';
import { ResultData } from 'src/core/results/result-data.result';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { CreateShareResponseDto } from '../dtos/shareDtos/responses/ShareCreateResponse.dto';
import { ShareUpdateResponseDto } from 'src/dtos/shareDtos/responses/ShareUpdateResponse.dto';
export declare class ShareController {
    private readonly shareService;
    private readonly resultHelper;
    constructor(shareService: ShareService, resultHelper: ResultHelper);
    createShare(createShareDto: CreateShareDto): Promise<ResultData<CreateShareResponseDto>>;
    updateUser(updateShareDto: UpdateShareDto): Promise<ResultData<ShareUpdateResponseDto>>;
    findAll(): Promise<ResultData<import("../entities").ShareEntity[]>>;
}
