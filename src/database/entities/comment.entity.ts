import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { COMMENT_STATUS } from '@shared/enum/comment.enum';
@Entity('comments')
export class Comment extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'varchar',
    default: COMMENT_STATUS.IN_REVIEW,
  })
  status: string;
}
