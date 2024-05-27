import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/set-metadata.decorator';
import { UserLoginRequestDto } from './dto/requests/UserLoginRequest.dto';
import { UserCreateRequestDto } from './dto/requests/UserCreateRequest.dto';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { ResultData } from 'src/core/results/result-data.result';
import { UserCreateResponseDto } from './dto/responses/UserCreateResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly resultHelper: ResultHelper,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: UserLoginRequestDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Public()
  @Post('signup')
  async signup(
    @Body() signupDto: UserCreateRequestDto,
  ): Promise<ResultData<UserCreateResponseDto>> {
    try {
      const signupResponse = await this.authService.signup(signupDto);
      return this.resultHelper.created(signupResponse);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
