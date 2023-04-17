import { User } from '@database/entities';
import { AuthenticateGuard } from '@modules/auth/guard/roles.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '@shared/decorator/user.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['user'],
    operationId: 'getMe',
    summary: 'Get current user',
    description: 'Get current user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async getMe(@CurrentUser('id') id: number): Promise<Partial<User>> {
    return this.userService.getMe(id);
  }

  @Put(':id')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['user'],
    operationId: 'updateOne',
    summary: 'Update one user',
    description: 'Update one user',
  })
  async updateOne(
    @CurrentUser('id') id: number,
    @Body() data: UpdateUserDto,
  ): Promise<Partial<void>> {
    return this.userService.updateOne(id, data);
  }

  @Put(':id/password')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['user'],
    operationId: 'updatePassword',
    summary: 'Update password',
    description: 'Update password',
  })
  async updatePassword(
    @CurrentUser('id') id: number,
    @Body() data: UpdatePasswordDto,
  ): Promise<void> {
    return this.userService.updatePassword(id, data);
  }
}
