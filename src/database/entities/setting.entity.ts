import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('settings')
export class Setting extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @Column({ name: 'kakao_link', default: '' })
  kakaoLink: string;

  @Column({ name: 'kakao_id', default: '' })
  kakaoId: string;

  @Column({ name: 'telegram_id', default: '' })
  telegramId: string;

  @Column({ default: '', nullable: true })
  phone: string;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  order: number;

  @Column({ name: 'view_auto_increment', default: 0 })
  viewAutoIncrement: number;
}
