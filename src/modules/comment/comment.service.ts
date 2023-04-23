import { PageMetaDto } from '@core/pagination/dto/page-meta.dto';
import { PageDto } from '@core/pagination/dto/page.dto';
import { Comment } from '@database/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/comment.dto';
import { FilterOptionDto } from '@core/pagination/dto/filter-option.dto';
import { COMMENT_STATUS } from '@shared/enum/comment.enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(
    pageOptionsDto: FilterOptionDto,
    isFilterApproved = false,
  ): Promise<PageDto<Comment>> {
    const queryBuilder = this.commentRepository.createQueryBuilder('comments');

    queryBuilder
      .orderBy('comments.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    if (isFilterApproved) {
      queryBuilder.where('comments.status = :status', {
        status: COMMENT_STATUS.APPROVED,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(data, pageMetaDto);
  }

  async findOneById(id: number): Promise<Comment> {
    return this.commentRepository.findOneByOrFail({ id });
  }

  async createOne(data: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(data);
    return this.commentRepository.save(comment);
  }

  async deleteOne(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async updateStatusOne(id: number, status: string): Promise<void> {
    const comment = await this.findOneById(id);
    comment.status = status;
    await this.commentRepository.save(comment);
  }
}
