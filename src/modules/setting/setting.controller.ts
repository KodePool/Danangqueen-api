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
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/setting.dto';
import { Setting as SettingEntity } from '@database/entities';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['setting'],
    operationId: 'getSettings',
    summary: 'Get settings',
    description: 'Get settings',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async find(): Promise<SettingEntity> {
    return this.settingService.find();
  }

  @Put()
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['setting'],
    operationId: 'update',
    summary: 'Update setting',
    description: 'Update setting',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async updateOne(
    @Body() data: UpdateSettingDto,
  ): Promise<Partial<SettingEntity>> {
    return this.settingService.updateOne(data);
  }
}
