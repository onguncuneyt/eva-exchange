import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRepository } from 'src/dao/repositories/UserRepository';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    SequelizeModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserRepository,
    JwtService,
    ResultHelper,
    DtoMapperService,
  ],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
