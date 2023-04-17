import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './modules/auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { CategoryModule } from '@modules/category/category.module';
import { PostModule } from '@modules/post/post.module';
import { CommentModule } from '@modules/comment/comment.module';
import { ImageModule } from '@modules/image/image.module';
import { SettingModule } from '@modules/setting/setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        maxQueryExecutionTime: configService.get<number>('DB_MAX_QUERY_TIME'),
        ssl:
          configService.get('DB_USE_SSL') === 'true'
            ? {
                ca: readFileSync('ca-certificate.crt'),
              }
            : undefined,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    PostModule,
    CommentModule,
    ImageModule,
    SettingModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
