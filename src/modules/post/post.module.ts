import { Category, Image, Post } from '@database/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, Image])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}