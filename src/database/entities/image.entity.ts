import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';
@Entity('images')
export class Image extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  url: string;

  @ManyToMany(() => Post, (post) => post.images)
  posts: Post[];
}
