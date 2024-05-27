"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./modules/user.module");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./core/configs/http-exception.filter");
const db_module_1 = require("./modules/db.module");
const auth_guard_1 = require("./auth/guards/auth.guard");
const role_guard_1 = require("./auth/guards/role.guard");
const auth_module_1 = require("./auth/auth.module");
const share_module_1 = require("./modules/share.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            share_module_1.ShareModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map