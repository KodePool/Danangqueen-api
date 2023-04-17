import { Setting as SettingEntity } from '@database/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingDto } from './dto/setting.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>,
  ) {}

  async find(): Promise<SettingEntity> {
    return (await this.settingRepository.find())[0];
  }

  async updateOne(data: UpdateSettingDto): Promise<SettingEntity> {
    const setting = await this.find();
    return this.settingRepository.save({ ...setting, ...data });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async doUpdateViewCount(): Promise<void> {
    const setting = await this.find();
    if (setting.viewAutoIncrement <= 0) return;
    const view = setting.view + setting.viewAutoIncrement;
    await this.settingRepository.save({ ...setting, view });
  }
}
