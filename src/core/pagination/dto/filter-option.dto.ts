import { PageOptionsDto } from '@core/pagination/dto/page-option.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterOptionDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  readonly filter?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly sort?: string;
}
