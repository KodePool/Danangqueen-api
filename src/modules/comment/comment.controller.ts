import { AuthenticateGuard } from '@modules/auth/guard/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment } from '@database/entities';
import { ReviewCommentDto } from './dto/review.dto';
import { FilterOptionDto } from '@core/pagination/dto/filter-option.dto';
import { PageDto } from '@core/pagination/dto/page.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('all')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['comment'],
    operationId: 'getAllComments',
    summary: 'Get all comments',
    description: 'Get all comments',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async findManyComments(
    @Query() pageOptionsDto: FilterOptionDto,
  ): Promise<PageDto<Comment>> {
    return this.commentService.findAll(pageOptionsDto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['comment'],
    operationId: 'getAllValidComments',
    summary: 'Get all valid comments',
    description: 'Get all valid comments',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async findAllowedComment(
    @Query() pageOptionsDto: FilterOptionDto,
  ): Promise<PageDto<Comment>> {
    return this.commentService.findAll(pageOptionsDto, true);
  }

  @Delete(':id')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['comment'],
    operationId: 'deleteComment',
    summary: 'Delete one comment',
    description: 'Delete one comment',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async deleteOne(@Param('id') id: number): Promise<void> {
    return this.commentService.deleteOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    tags: ['comment'],
    operationId: 'createComment',
    summary: 'Create one comment',
    description: 'Create one comment',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  async createOne(@Body() data: CreateCommentDto): Promise<Comment> {
    return this.commentService.createOne(data);
  }

  @Post(':id/review')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    tags: ['comment'],
    operationId: 'reviewComment',
    summary: 'Review One comment',
    description: 'Review One comment',
  })
  async review(
    @Param('id') id: number,
    @Body() data: ReviewCommentDto,
  ): Promise<void> {
    await this.commentService.updateStatusOne(id, data.status);
  }
}
