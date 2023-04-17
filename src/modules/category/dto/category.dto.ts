import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  koreanName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  englishName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}
