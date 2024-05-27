import { CreateShareDto } from '../../dtos/shareDtos/requests/ShareCreateRequest.dto';
import { UpdateShareDto } from '../../dtos/shareDtos/requests/ShareUpdateRequest.dto';
import { ShareEntity } from 'src/entities';
export interface IShare {
    create(item: CreateShareDto): Promise<ShareEntity>;
    update(item: UpdateShareDto): Promise<ShareEntity>;
    findAll(): Promise<ShareEntity[]>;
}
