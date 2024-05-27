import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  PortfolioEntity,
  PortfolioSharesEntity,
  ShareEntity,
  TransactionEntity,
  UserEntity,
} from '../entities';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USER') || 'postgres',
        password: configService.get('DB_PASSWORD') || 'postgres',
        database: configService.get('DB_DATABASE') || 'eva_exchange',
        autoLoadModels: true, // autoLoadModels özelliğini devre dışı bırakın
        synchronize: true,
        models: [
          UserEntity,
          ShareEntity,
          PortfolioEntity,
          PortfolioSharesEntity,
          TransactionEntity,
        ],
        logging: (msg) => console.log(msg),
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([
      UserEntity,
      ShareEntity,
      PortfolioEntity,
      PortfolioSharesEntity,
      TransactionEntity,
    ]),
  ],
})
export class DatabaseModule {}
