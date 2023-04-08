import { AuthenticateGuard } from '@modules/auth/guard/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/post.dto';
import { Comment } from '@database/entities';
import { PageOptionsDto } from '@core/pagination/dto/page-option.dto';
import { PageDto } from '@core/pagination/dto/page.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
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
  async findMany(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Comment>> {
    return this.commentService.findAll(pageOptionsDto);
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
}
