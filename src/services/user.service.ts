import { Injectable } from '@nestjs/common';
import { UserCreateRequestDto } from 'src/auth/dto/requests/UserCreateRequest.dto';
import { UserRepository } from 'src/dao/repositories/UserRepository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: number) {
    return {};
  }

  async create(user: UserCreateRequestDto) {
    return await this.userRepository.create(user);
  }

  async update(id: number, data: any) {
    return {};
  }

  async remove(id: number) {
    return {};
  }
}
