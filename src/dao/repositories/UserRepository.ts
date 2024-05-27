import { IUser } from '../interfaces/IUser';
import { UserUpdateRequestDto } from 'src/dtos/userDtos/requests/UserUpdateRequest.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from 'src/entities';
import { EmailExsitException } from 'src/core/exceptions/email-exist.exception';
import * as argon2 from 'argon2';
import { UserCreateRequestDto } from 'src/auth/dto/requests/UserCreateRequest.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUser {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: typeof UserEntity,
  ) {}
  findById(userId: any): Promise<UserEntity> {
    return this.userModel.findByPk(userId);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async create(item: UserCreateRequestDto): Promise<UserEntity> {
    const { password, email } = item;

    const userWithSameCredentials = await this.userModel.findOne({
      where: { email },
    });

    if (userWithSameCredentials) {
      throw new EmailExsitException();
    }

    const hashedPassword = await argon2.hash(password);

    return await this.userModel.create({
      email,
      password: hashedPassword,
    });
  }

  update(item: UserUpdateRequestDto): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
