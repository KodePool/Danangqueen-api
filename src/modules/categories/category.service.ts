import { Category } from '@database/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOneById(id: number): Promise<Category> {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  async createOne(data: CategoryDto): Promise<Category> {
    const isCategoryExisted = await this.categoryRepository.findOneBy({
      name: data.name,
    });
    if (isCategoryExisted) {
      throw new NotFoundException('Category is existed');
    }
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  async updateOne(id: number, data: CategoryDto): Promise<Category> {
    const category = await this.findOneById(id);
    const isCategoryExisted = await this.categoryRepository.findOneBy({
      name: data.name,
      id: Not(id),
    });
    if (isCategoryExisted) {
      throw new NotFoundException(`Category ${data.name} is existed`);
    }
    return this.categoryRepository.save({ ...category, ...data });
  }

  async deleteOne(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
