import { IUser } from '../interfaces/IUser';
import { UserUpdateRequestDto } from 'src/dtos/userDtos/requests/UserUpdateRequest.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RoleEnum, UserEntity } from 'src/entities';
import { EmailExsitException } from 'src/core/exceptions/email-exist.exception';
import * as argon2 from 'argon2';
import { UserCreateRequestDto } from 'src/auth/dto/requests/UserCreateRequest.dto';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/core/exceptions/not-found.exception';
import { AddMoneyDto } from 'src/dtos/userDtos/requests/AddMoneyRequest.dto';

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

  async updateAdminStatus(id: string): Promise<UserEntity> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw NotFoundException;
    }
    user.roles = [...user.roles, RoleEnum.ADMIN];

    return await user.save();
  }

  async addMoney(addMoneyDto: AddMoneyDto, currUser: any) {
    const user = await this.userModel.findOne({ where: { id: currUser.sub } });
    if (!user) {
      throw NotFoundException;
    }
    const { amount } = addMoneyDto;
    user.balance = parseFloat(
      (Number(user.balance) + parseFloat(amount.toFixed(2))).toFixed(2),
    );

    return await user.save();
  }

  async findUsers(): Promise<UserEntity[]> {
    return await this.userModel.findAll();
  }

  async bulkCreate(usersData: any[]): Promise<UserEntity[]> {
    try {
      await Promise.all(
        usersData.map(async (user) => {
          user.password = await argon2.hash(user.password);
        }),
      );
      const createdUsers = await this.userModel.bulkCreate(usersData);
      return createdUsers;
    } catch (error) {
      throw new Error(
        `Error occurred while bulk creating users: ${error.message}`,
      );
    }
  }
}
