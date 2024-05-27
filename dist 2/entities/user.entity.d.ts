import { Model } from 'sequelize-typescript';
export declare class UserEntity extends Model<UserEntity> {
    id: string;
    password: string;
    email: string;
    balance: number;
    roles: string[];
}
export declare enum RoleEnum {
    USER = "user",
    ADMIN = "admin",
    SUPER_ADMIN = "super_admin"
}
