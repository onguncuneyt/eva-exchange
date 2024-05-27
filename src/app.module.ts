import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './core/configs/http-exception.filter';
import { DatabaseModule } from './modules/db.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/role.guard';
import { AuthModule } from './auth/auth.module';
import { ShareModule } from './modules/share.module';
import { ConfigModule } from '@nestjs/config';
import { PortfolioModule } from './modules/portfolio.module';
import { TransactionModule } from './modules/transaction.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ShareModule,
    PortfolioModule,
    TransactionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
