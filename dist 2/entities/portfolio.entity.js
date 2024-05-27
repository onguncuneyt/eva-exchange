"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let PortfolioEntity = class PortfolioEntity extends sequelize_typescript_1.Model {
};
exports.PortfolioEntity = PortfolioEntity;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], PortfolioEntity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    }),
    __metadata("design:type", String)
], PortfolioEntity.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        defaultValue: [],
        allowNull: false,
    }),
    __metadata("design:type", Array)
], PortfolioEntity.prototype, "shares", void 0);
exports.PortfolioEntity = PortfolioEntity = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'portfolios', schema: 'public' })
], PortfolioEntity);
//# sourceMappingURL=portfolio.entity.js.map