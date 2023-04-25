import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('settings')
export class Setting extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  kakaoLink: string;

  @Column({ default: '' })
  kakaoId: string;

  @Column({ default: 'admin@gmail.com' })
  email: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  order: number;

  @Column({ name: 'view_auto_increment', default: 0 })
  viewAutoIncrement: number;
}
