import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from 'src/controllers/user.controller';
import { UserRepository } from 'src/dao/repositories/UserRepository';
import { UserEntity } from 'src/entities';
import { UsersService } from 'src/services/user.service';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
