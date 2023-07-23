import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UploadedImageResponse } from '../../comment/dto/uploaded-image.response';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    type: [UploadedImageResponse],
  })
  @IsArray()
  @IsNotEmpty()
  images: UploadedImageResponse[];
}

export class UpdatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  view: number;

  @ApiProperty({
    type: [UploadedImageResponse],
  })
  @IsArray()
  @IsNotEmpty()
  images: UploadedImageResponse[];
}

export class DeleteImageDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  imageIds: number[];
}
