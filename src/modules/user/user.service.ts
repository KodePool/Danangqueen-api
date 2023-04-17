import { PageMetaDto } from '@core/pagination/dto/page-meta.dto';
import { PageOptionsDto } from '@core/pagination/dto/page-option.dto';
import { PageDto } from '@core/pagination/dto/page.dto';
import { User } from '@database/entities';
import * as argon2 from 'argon2';
import { AuthCredentialDto } from '@modules/auth/dto/auth-credential.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('users');

    queryBuilder
      .orderBy('users.id', pageOptionsDto.order)
      .select([
        'users.id',
        'users.email',
        'users.role',
        'users.status',
        'users.avatar',
        'users.gender',
        'users.username',
      ])
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(data, pageMetaDto);
  }

  async getMe(id: number): Promise<Partial<User>> {
    const foundUser = await this.userRepository.findOneByOrFail({ id });
    delete foundUser.password;
    return foundUser;
  }

  async createOne(data: User | AuthCredentialDto): Promise<User> {
    const isUserExisted = await this.userRepository.findOneBy({
      username: data.username,
    });
    if (isUserExisted) {
      throw new NotFoundException('User is existed');
    }
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateOne(id: number, data: UpdateUserDto): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.save({ ...user, ...data });
  }

  async updatePassword(id: number, data: UpdatePasswordDto): Promise<void> {
    const user = await this.findOneById(id);

    const isValidPassword = await argon2.verify(
      user.password,
      data.oldPassword,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Old password is invalid');
    }

    const hashedPassword = await argon2.hash(data.newPassword);
    await this.userRepository.save({ ...user, password: hashedPassword });
  }
}
