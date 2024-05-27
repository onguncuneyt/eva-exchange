import { CreateShareDto } from '../../dtos/shareDtos/requests/ShareCreateRequest.dto';
import { UpdateShareDto } from '../../dtos/shareDtos/requests/ShareUpdateRequest.dto';
import { ShareEntity } from 'src/entities';
import { IShare } from '../interfaces/IShare';
export declare class ShareRepository implements IShare {
    private readonly shareModel;
    constructor(shareModel: typeof ShareEntity);
    create(item: CreateShareDto): Promise<ShareEntity>;
    update(item: UpdateShareDto): Promise<ShareEntity>;
    findAll(): Promise<ShareEntity[]>;
    findOne(shareId: any): Promise<ShareEntity>;
}
