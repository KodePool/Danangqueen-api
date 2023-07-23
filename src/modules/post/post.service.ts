import { PageMetaDto } from '@core/pagination/dto/page-meta.dto';
import { PageDto } from '@core/pagination/dto/page.dto';
import { Image, Post } from '@database/entities';
import { Category } from '@database/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { FilterOptionDto } from '@core/pagination/dto/filter-option.dto';
import { ImageService } from '@modules/image/image.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    private readonly imageService: ImageService,
  ) {}

  async findAll(pageOptionsDto: FilterOptionDto): Promise<PageDto<Post>> {
    const queryBuilder = this.postRepository.createQueryBuilder('posts');

    queryBuilder
      .leftJoinAndSelect('posts.images', 'images')
      .leftJoinAndSelect('posts.category', 'category')
      .orderBy('posts.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    if (pageOptionsDto.filter) {
      const [key, value] = pageOptionsDto.filter.split('=');
      if (key === 'categoryId') {
        queryBuilder.andWhere('posts.category_id = :categoryId', {
          categoryId: value,
        });
      }
    }

    const itemCount = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(data, pageMetaDto);
  }

  async findOneById(id: number): Promise<Post> {
    return this.postRepository.findOneOrFail({
      where: { id },
      relations: ['images', 'category'],
    });
  }

  async createOne(data: CreatePostDto): Promise<Post> {
    const isCategoryExisted = await this.categoryRepository.findOneBy({
      id: parseInt(data.categoryId),
    });
    if (!isCategoryExisted) {
      throw new NotFoundException('Category is not existed');
    }

    const uploadedImages = data.images;
    const post = this.postRepository.create(data);
    post.category = isCategoryExisted;
    const createdImages = uploadedImages.map((image) => {
      const img = new Image();
      img.url = image.url;
      img.name = image.publicId;
      img.post = post;
      return img;
    });

    const createdPost = await this.postRepository.save(post);
    await this.imageRepository.save(createdImages);

    return createdPost;
  }

  async updateOne(id: number, data: UpdatePostDto): Promise<Post> {
    const { categoryId, images, ...rest } = data;
    const post = await this.postRepository.findOneOrFail({
      where: { id },
      relations: ['images', 'category'],
    });

    if (parseInt(categoryId) !== post.category.id) {
      const isCategoryExisted = await this.categoryRepository.findOneBy({
        id: parseInt(categoryId),
      });
      if (!isCategoryExisted) {
        throw new NotFoundException('Category is not existed');
      }
      post.category = isCategoryExisted;
    }
    let createdNewImages: Image[] = [];
    if (images.length > 0) {
      const newImages = images.map((image) => {
        const img = new Image();
        img.url = image.url;
        img.name = image.publicId;
        img.post = { id: post.id } as Post;
        return img;
      });

      createdNewImages = await this.imageRepository.save(newImages);
    }

    post.images = [...post.images, ...createdNewImages];
    return this.postRepository.save({ ...post, ...rest });
  }

  async deleteOne(id: number): Promise<void> {
    await this.postRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const post = await transactionalEntityManager.findOne(Post, {
          where: { id },
          relations: ['images'],
        });

        const imageIds = post.images.map((image) => image.id);
        await transactionalEntityManager.delete(Image, { id: In(imageIds) });
        await transactionalEntityManager.delete(Post, { id });
        const imagesPublicId = post.images.map((image) => image.name);
        await Promise.all(
          imagesPublicId.map((id) => this.imageService.deleteFile(id)),
        );
      },
    );
  }

  async deleteImage(postId: number, imageIds: number[]): Promise<void> {
    const post = await this.postRepository.findOneOrFail({
      where: { id: postId },
      relations: ['images'],
    });
    const imagesToDelete = post.images.filter((image) =>
      imageIds.includes(image.id),
    );
    const imagesPublicId = imagesToDelete.map((image) => image.name);
    await Promise.all(
      imagesPublicId.map((id) => this.imageService.deleteFile(id)),
    );
    await this.postRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(Image, { id: In(imageIds) });
      },
    );
  }
}
