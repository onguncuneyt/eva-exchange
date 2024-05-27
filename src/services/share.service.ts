import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShareDto } from '../dtos/shareDtos/requests/ShareCreateRequest.dto';
import { UpdateShareDto } from '../dtos/shareDtos/requests/ShareUpdateRequest.dto';
import { NotFoundException } from 'src/core/exceptions/not-found.exception';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { CreateShareResponseDto } from 'src/dtos/shareDtos/responses/ShareCreateResponse.dto';
import { ShareUpdateResponseDto } from 'src/dtos/shareDtos/responses/ShareUpdateResponse.dto';
import { ShareRepository } from 'src/dao/repositories/ShareRepository';

@Injectable()
export class ShareService {
  constructor(
    private readonly shareRepository: ShareRepository,
    private readonly dtoMapperService: DtoMapperService,
  ) {}

  async createShare(
    createShareDto: CreateShareDto,
  ): Promise<CreateShareResponseDto> {
    const { symbol, ...rest } = createShareDto;
    const createdShare = await this.shareRepository.create({ ...rest, symbol });

    return this.dtoMapperService.mapToDto(
      createdShare.dataValues,
      CreateShareResponseDto,
    );
  }

  async updateShare(
    updateShareDto: UpdateShareDto,
  ): Promise<CreateShareResponseDto> {
    const updatedShare = await this.shareRepository.update(updateShareDto);

    return this.dtoMapperService.mapToDto(
      updatedShare.dataValues,
      ShareUpdateResponseDto,
    );
  }

  async findShares() {
    let shares = await this.shareRepository.findAll();
    return shares;
  }
}
