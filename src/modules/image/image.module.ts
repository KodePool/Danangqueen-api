import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
