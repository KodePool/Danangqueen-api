import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { Category } from './category.entity';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { randomNumberBetween } from '@shared/util/random';
@Entity('posts')
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ default: 0 })
  view: number;

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Image, {
    cascade: true,
  })
  @JoinTable({
    name: 'posts_images',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image_id',
      referencedColumnName: 'id',
    },
  })
  images: Image[];

  @BeforeInsert()
  generateView(): void {
    this.view = randomNumberBetween(50, 150);
  }
}
