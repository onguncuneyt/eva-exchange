import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AddMoneyDto } from 'src/dtos/userDtos/requests/AddMoneyRequest.dto';
import { RoleEnum } from 'src/entities';
import { UsersService } from 'src/services/user.service';
import { Request } from 'express';
import { userData } from 'src/bulkData/userData';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('add-money')
  @Roles(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async addMoney(@Body() addMoneyDto: AddMoneyDto, @Req() req: Request) {
    return this.usersService.addMoney(addMoneyDto, req.user);
  }

  @Get('all')
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async findAll() {
    return this.usersService.findUsers();
  }

  @Patch('/make-admin')
  @Roles(RoleEnum.SUPER_ADMIN)
  async findOne(@Query('id') id: string) {
    return this.usersService.updateAdminStatus(id);
  }

  @Post('bulk-create')
  async bulkCreateUsers() {
    return await this.usersService.bulkCreateUsers(userData);
  }
}
