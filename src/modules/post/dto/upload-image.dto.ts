import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UploadImageDto {
  @ApiProperty()
  @IsNumber()
  postId: number;
}
