import { UserCreateRequestDto } from 'src/auth/dto/requests/UserCreateRequest.dto';
import { AddMoneyDto } from 'src/dtos/userDtos/requests/AddMoneyRequest.dto';
import { UserUpdateRequestDto } from 'src/dtos/userDtos/requests/UserUpdateRequest.dto';
import { UserEntity } from 'src/entities';

export interface IUser {
  findByEmail(item: string): Promise<UserEntity>;
  create(item: UserCreateRequestDto): Promise<UserEntity>;
  update(item: UserUpdateRequestDto): Promise<UserEntity>;
  delete(id: string): Promise<boolean>;
  findById(userId: any): Promise<UserEntity>;
  updateAdminStatus(id: string): Promise<UserEntity>;
  addMoney(addMoneyDto: AddMoneyDto, currUser: any);
  bulkCreate(usersData: any[]): Promise<UserEntity[]>;
}
