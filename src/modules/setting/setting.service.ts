import { Setting as SettingEntity } from '@database/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingDto } from './dto/setting.dto';

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
}
