import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShareEntity } from '../entities';
import { ShareController } from '../controllers/share.controller';
import { ShareService } from '../services/share.service';
import { ShareRepository } from 'src/dao/repositories/ShareRepository';
import { DtoMapperService } from 'src/core/utils/dto-mapper.util';
import { ResultHelper } from 'src/core/utils/result-helper.util';

@Module({
  imports: [SequelizeModule.forFeature([ShareEntity])],
  controllers: [ShareController],
  providers: [ShareService, ShareRepository, DtoMapperService, ResultHelper],
  exports: [ShareRepository],
})
export class ShareModule {}
