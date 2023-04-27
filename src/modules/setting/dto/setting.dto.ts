import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kakaoLink: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kakaoId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telegramId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  view: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  viewAutoIncrement: number;
}
