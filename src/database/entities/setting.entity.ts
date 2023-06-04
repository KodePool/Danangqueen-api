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

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ name: 'total_view', default: 0 })
  totalView: number;

  @Column({ name: 'yesterday_view', default: 0 })
  yesterdayView: number;

  @Column({ name: 'today_view', default: 0 })
  todayView: number;

  @Column({ name: 'max_view', default: 0 })
  maxView: number;

  @Column({ default: 0 })
  reservation: number;

  @Column({ name: 'reservation_auto_increment', default: 0 })
  reservationAutoIncrement: number;
}
