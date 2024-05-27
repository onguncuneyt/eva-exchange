import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../entities';
import { ShareService } from '../services/share.service';
import { CreateShareDto } from '../dtos/shareDtos/requests/ShareCreateRequest.dto';
import { UpdateShareDto } from '../dtos/shareDtos/requests/ShareUpdateRequest.dto';
import { ResultData } from 'src/core/results/result-data.result';
import { ResultHelper } from 'src/core/utils/result-helper.util';
import { CreateShareResponseDto } from '../dtos/shareDtos/responses/ShareCreateResponse.dto';
import { ShareUpdateResponseDto } from 'src/dtos/shareDtos/responses/ShareUpdateResponse.dto';

@Controller('share')
export class ShareController {
  constructor(
    private readonly shareService: ShareService,
    private readonly resultHelper: ResultHelper,
  ) {}
  @Post('create')
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async createShare(
    @Body() createShareDto: CreateShareDto,
  ): Promise<ResultData<CreateShareResponseDto>> {
    try {
      const shareResponse = await this.shareService.createShare(createShareDto);
      return this.resultHelper.created(shareResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch('update')
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async updateUser(
    @Body() updateShareDto: UpdateShareDto,
  ): Promise<ResultData<ShareUpdateResponseDto>> {
    try {
      const shareResponse = await this.shareService.updateShare(updateShareDto);
      return this.resultHelper.uptaded(shareResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('all')
  @Roles(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async findAll() {
    try {
      const shareResponse = await this.shareService.findShares();
      return this.resultHelper.successData(shareResponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
