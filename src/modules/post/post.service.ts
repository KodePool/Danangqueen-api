import { PageMetaDto } from '@core/pagination/dto/page-meta.dto';
import { PageDto } from '@core/pagination/dto/page.dto';
import { Post } from '@database/entities';
import { Category } from '@database/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertPostDto } from './dto/post.dto';
import { FilterOptionDto } from '@core/pagination/dto/filter-option.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(pageOptionsDto: FilterOptionDto): Promise<PageDto<Post>> {
    const queryBuilder = this.postRepository.createQueryBuilder('users');

    queryBuilder
      .orderBy('users.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(data, pageMetaDto);
  }

  async findOneById(id: number): Promise<Post> {
    return this.postRepository.findOneOrFail({
      where: { id },
      relations: ['comments'],
    });
  }

  async createOne(data: UpsertPostDto): Promise<Post> {
    const isCategoryExisted = await this.categoryRepository.findOneBy({
      id: data.categoryId,
    });
    if (!isCategoryExisted) {
      throw new NotFoundException('Category is not existed');
    }

    const post = this.postRepository.create(data);
    post.category = isCategoryExisted;

    return this.postRepository.save(post);
  }

  async updateOne(id: number, data: UpsertPostDto): Promise<Post> {
    const post = await this.findOneById(id);
    return this.postRepository.save({ ...post, ...data });
  }

  async deleteOne(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
