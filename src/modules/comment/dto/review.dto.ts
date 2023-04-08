import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum REVIEW_COMMENT_ENUM {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class ReviewCommentDto {
  @ApiProperty({
    enum: REVIEW_COMMENT_ENUM,
  })
  @IsNotEmpty()
  @IsEnum(REVIEW_COMMENT_ENUM, {
    message: `Status must be in ${Object.values(REVIEW_COMMENT_ENUM)}`,
  })
  status: REVIEW_COMMENT_ENUM;
}
