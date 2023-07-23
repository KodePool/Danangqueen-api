import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
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

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @BeforeInsert()
  generateView(): void {
    this.view = randomNumberBetween(50, 150);
  }
}
