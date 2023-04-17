import { Category } from '@database/entities/category.entity';
import { AuthenticateGuard } from '@modules/auth/guard/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { UpsertCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get(':id')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['category'],
    operationId: 'findOne',
    summary: 'Find one category',
    description: 'Find one category',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOneById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['category'],
    operationId: 'getAllCategory',
    summary: 'Get all categories',
    description: 'Get all categories',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async findMany(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Put(':id')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['category'],
    operationId: 'updateOne',
    summary: 'Update one category',
    description: 'Update one category',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() data: UpsertCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateOne(id, data);
  }

  @Delete(':id')
  @AuthenticateGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['category'],
    operationId: 'deleteOne',
    summary: 'Delete one category',
    description: 'Delete one category',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async deleteOne(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteOne(id);
  }

  @Post()
  @AuthenticateGuard()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    tags: ['category'],
    operationId: 'createOne',
    summary: 'Create one category',
    description: 'Create one category',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  async createOne(@Body() data: UpsertCategoryDto): Promise<Category> {
    return this.categoryService.createOne(data);
  }
}
