"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const entities_1 = require("../entities");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    dialect: 'postgres',
                    host: configService.get('DB_HOST') || 'localhost',
                    port: configService.get('DB_PORT') || 5432,
                    username: configService.get('DB_USER') || 'postgres',
                    password: configService.get('DB_PASSWORD') || 'postgres',
                    database: configService.get('DB_DATABASE') || 'eva_exchange',
                    autoLoadModels: true,
                    synchronize: true,
                    models: [
                        entities_1.UserEntity,
                        entities_1.ShareEntity,
                        entities_1.PortfolioEntity,
                        entities_1.PortfolioSharesEntity,
                        entities_1.TransactionEntity,
                    ],
                    logging: (msg) => console.log(msg),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=db.module.js.map