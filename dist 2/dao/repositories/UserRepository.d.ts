import { IUser } from '../interfaces/IUser';
import { UserUpdateRequestDto } from 'src/dtos/userDtos/requests/UserUpdateRequest.dto';
import { UserEntity } from 'src/entities';
import { UserCreateRequestDto } from 'src/auth/dto/requests/UserCreateRequest.dto';
export declare class UserRepository implements IUser {
    private readonly userModel;
    constructor(userModel: typeof UserEntity);
    findById(userId: any): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    create(item: UserCreateRequestDto): Promise<UserEntity>;
    update(item: UserUpdateRequestDto): Promise<UserEntity>;
    delete(id: string): Promise<boolean>;
}
