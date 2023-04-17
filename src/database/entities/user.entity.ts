import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as argon2 from 'argon2';
import { USER_ROLE } from '@shared/enum/user.enum';
import { BaseEntity } from './base.entity';
@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: USER_ROLE.ADMIN })
  role: USER_ROLE;

  @Column({ default: true })
  status: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @BeforeUpdate()
  async updatePassword() {
    this.password = await argon2.hash(this.password);
  }
}
