import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as argon2 from 'argon2';
import { USER_ROLE } from '@shared/enum/user.enum';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: USER_ROLE.USER })
  role: USER_ROLE;

  @Column({ default: true })
  gender: boolean;

  @Column({ default: '' })
  avatar: string;

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
