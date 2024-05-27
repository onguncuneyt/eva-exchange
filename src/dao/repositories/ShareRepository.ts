import { CreateShareDto } from '../../dtos/shareDtos/requests/ShareCreateRequest.dto';
import { UpdateShareDto } from '../../dtos/shareDtos/requests/ShareUpdateRequest.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ShareEntity } from 'src/entities';
import { Injectable } from '@nestjs/common';
import { IShare } from '../interfaces/IShare';
import { ShareExistException } from 'src/core/exceptions/share-exist.exception';
import { NotFoundException } from 'src/core/exceptions/not-found.exception';

@Injectable()
export class ShareRepository implements IShare {
  constructor(
    @InjectModel(ShareEntity)
    private readonly shareModel: typeof ShareEntity,
  ) {}

  async create(item: CreateShareDto): Promise<ShareEntity> {
    const { name, symbol, amount, rate } = item;
    const upperCaseSymbol = symbol.toUpperCase();
    const shareWithSameSymbol = await this.shareModel.findOne({
      where: { symbol: upperCaseSymbol },
    });

    if (shareWithSameSymbol) {
      throw new ShareExistException();
    }

    return await this.shareModel.create({
      name,
      symbol: upperCaseSymbol,
      amount,
      rate,
    });
  }

  async update(item: UpdateShareDto): Promise<ShareEntity> {
    const { symbol, rate } = item;

    let symbolUpper = symbol.toUpperCase();

    const share = await this.shareModel.findOne({
      where: { symbol: symbolUpper },
    });

    if (!share) {
      throw new NotFoundException();
    }

    share.rate = rate;

    let returnValue = await this.shareModel.update(share.dataValues, {
      returning: true,
      where: { symbol: symbolUpper },
    });

    return returnValue[1][0];
  }

  findAll(): Promise<ShareEntity[]> {
    return this.shareModel.findAll();
  }

  async findOne(shareId: any) {
    return await this.shareModel.findOne({
      where: { id: shareId },
    });
  }
}
