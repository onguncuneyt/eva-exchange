import { UserCreateRequestDto } from 'src/auth/dto/requests/UserCreateRequest.dto';
import { UserRepository } from 'src/dao/repositories/UserRepository';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findOne(id: number): Promise<{}>;
    create(user: UserCreateRequestDto): Promise<import("../entities").UserEntity>;
    update(id: number, data: any): Promise<{}>;
    remove(id: number): Promise<{}>;
}
