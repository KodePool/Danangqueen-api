import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('settings')
export class Setting extends BaseEntity {
  @Column()
  name: string;

  @Column()
  kakao: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  describe: string;

  @Column()
  view: number;
}
