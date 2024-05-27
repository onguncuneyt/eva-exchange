import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from '../../entities';
import * as argon2 from 'argon2';
import { UserRepository } from 'src/dao/repositories/UserRepository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
