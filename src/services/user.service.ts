import { Injectable } from '@nestjs/common';
import { UserCreateRequestDto } from 'src/auth/dto/requests/UserCreateRequest.dto';
import { UserRepository } from 'src/dao/repositories/UserRepository';
import { AddMoneyDto } from 'src/dtos/userDtos/requests/AddMoneyRequest.dto';
import { UserEntity } from 'src/entities';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers() {
    return this.userRepository.findUsers();
  }

  async updateAdminStatus(id: string): Promise<UserEntity> {
    return this.userRepository.updateAdminStatus(id);
  }

  async addMoney(addMoneyDto: AddMoneyDto, currUser: any) {
    return this.userRepository.addMoney(addMoneyDto, currUser);
  }

  async bulkCreateUsers(usersData: any): Promise<UserEntity[]> {
    try {
      const createdUsers = await this.userRepository.bulkCreate(usersData);
      return createdUsers;
    } catch (error) {
      throw new Error(
        `Error occurred while bulk creating users: ${error.message}`,
      );
    }
  }
}
