import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtConstants } from './constants';
import { UserLoginRequestDto } from './dto/requests/UserLoginRequest.dto';
import { UserCreateResponseDto } from './dto/responses/UserCreateResponse.dto';
import { UserRepository } from 'src/dao/repositories/UserRepository';
import { UserCreateRequestDto } from './dto/requests/UserCreateRequest.dto';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { UserLoginResponseDto } from './dto/responses/UserLoginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly localStrategy: LocalStrategy,
    private readonly userRepository: UserRepository,
    private readonly dtoMapperService: DtoMapperService,
  ) {}
  createToken(user: UserEntity): string {
    const payload = {
      email: user.email,
      roles: user.roles,
      sub: user.id,
    };
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: jwtConstants.secret,
    });
  }

  async login(loginDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const { email, password } = loginDto;
    const user = await this.localStrategy.validate(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.createToken(user);
    return this.dtoMapperService.mapToDto({ token }, UserLoginResponseDto);
  }

  async signup(
    signupDto: UserCreateRequestDto,
  ): Promise<UserCreateResponseDto> {
    const createdUser = await this.userRepository.create(signupDto);
    return this.dtoMapperService.mapToDto(
      createdUser.dataValues,
      UserCreateResponseDto,
    );
  }
}
