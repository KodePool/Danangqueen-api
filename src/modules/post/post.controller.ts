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
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto, DeleteImageDto, UpdatePostDto } from './dto/post.dto';
import { Post as PostEntity } from '@database/entities';
import { PageDto } from '@core/pagination/dto/page.dto';
import { FilterOptionDto } from '@core/pagination/dto/filter-option.dto';
import { imageOption } from '@core/config/image.config';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['post'],
    operationId: 'findOne',
    summary: 'Find one post',
    description: 'Find one post',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOneById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['post'],
    operationId: 'getAllPosts',
    summary: 'Get all posts',
    description: 'Get all posts',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async findMany(
    @Query() pageOptionsDto: FilterOptionDto,
  ): Promise<PageDto<PostEntity>> {
    return this.postService.findAll(pageOptionsDto);
  }

  @Put(':id')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['post'],
    operationId: 'updateOne',
    summary: 'Update one post',
    description: 'Update one post',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
  ): Promise<Partial<PostEntity>> {
    return this.postService.updateOne(id, data);
  }

  @Delete(':id')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['post'],
    operationId: 'deleteOne',
    summary: 'Delete one post',
    description: 'Delete one post',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async deleteOne(@Param('id') id: number): Promise<void> {
    return this.postService.deleteOne(id);
  }

  @Post()
  @AuthenticateGuard()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    tags: ['post'],
    operationId: 'createOne',
    summary: 'Create one post',
    description: 'Create one post',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  async createOne(@Body() data: CreatePostDto): Promise<PostEntity> {
    return this.postService.createOne(data);
  }

  @Delete(':id/images')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    tags: ['post'],
    operationId: 'createOne',
    summary: 'Create one post',
    description: 'Create one post',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  async deleteImage(
    @Param('id') id: number,
    @Body() data: DeleteImageDto,
  ): Promise<void> {
    await this.postService.deleteImage(id, data.imageIds);
  }
}
