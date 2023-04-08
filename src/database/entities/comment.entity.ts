import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from './base.entity';
@Entity('comments')
export class Comment extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 0 })
  status: number;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
