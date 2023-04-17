import { Entity, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from './base.entity';
@Entity('categories')
export class Category extends BaseEntity {
  @Column({ name: 'korean_name' })
  koreanName: string;

  @Column({ name: 'english_name' })
  englishName: string;

  @Column({ name: 'address' })
  address: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post;
}
