import { Category, Image, Post } from '@database/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentModule } from '@modules/comment/comment.module';
import { ImageModule } from '@modules/image/image.module';

@Module({
  imports: [
    CommentModule,
    ImageModule,
    TypeOrmModule.forFeature([Post, Category, Image]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
