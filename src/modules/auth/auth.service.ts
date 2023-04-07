import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponse } from './response/register.response';
import { User } from '@database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(
    authCredentialDto: AuthCredentialDto,
  ): Promise<RegisterResponse> {
    const user = await this.userService.createOne(authCredentialDto);
    return {
      id: user.id,
      username: user.username,
    };
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      userId: user.id,
    };
    return {
      email: user.email,
      username: user.username,
      token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async validateAndGetUser(
    authCredentialDto: AuthCredentialDto,
  ): Promise<User> {
    const { username, password } = authCredentialDto;
    const isUserExisted = await this.userRepository.findOneBy({
      username,
    });
    if (!isUserExisted) {
      throw new UnauthorizedException('username or password is incorrect');
    }

    const isValidPassword = await argon2.verify(
      isUserExisted.password,
      password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('username or password is incorrect');
    }

    return isUserExisted;
  }
}
