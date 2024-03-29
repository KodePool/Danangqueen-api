import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterResponse } from './response/register.response';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { LoginResponse } from './response/login.response';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User } from '@database/entities';
import { CurrentUser } from '@shared/decorator/user.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    tags: ['auth'],
    operationId: 'register',
    summary: 'Register',
    description: 'Register a new user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async register(@Body() data: AuthCredentialDto): Promise<RegisterResponse> {
    return this.authService.registerUser(data);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['auth'],
    operationId: 'login',
    summary: 'Login',
    description: 'Login',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async login(
    @Body() _: AuthCredentialDto,
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const data = await this.authService.login(user);
    res.cookie('token', data.token);
    return data;
  }
}
