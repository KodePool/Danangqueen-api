import { PageMetaDto } from '@core/pagination/dto/page-meta.dto';
import { PageDto } from '@core/pagination/dto/page.dto';
import { Comment, Post } from '@database/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/post.dto';
import { PageOptionsDto } from '@core/pagination/dto/page-option.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Comment>> {
    const queryBuilder = this.commentRepository.createQueryBuilder('comments');

    queryBuilder
      .orderBy('comments.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(data, pageMetaDto);
  }

  async findOneById(id: number): Promise<Comment> {
    return this.commentRepository.findOneByOrFail({ id });
  }

  async createOne(data: CreateCommentDto): Promise<Comment> {
    const isPostExisted = await this.postRepository.findOneBy({
      id: data.postId,
    });
    if (!isPostExisted) {
      throw new NotFoundException('Post is not existed');
    }

    const comment = this.commentRepository.create(data);
    comment.post = isPostExisted;

    return this.commentRepository.save(comment);
  }

  async deleteOne(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
