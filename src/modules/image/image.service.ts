/* eslint-disable @typescript-eslint/naming-convention */
import { ProjectLogger } from '@core/loggers';
import { UploadedImageResponse } from '@modules/comment/dto/uploaded-image.response';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { unlink } from 'fs';

@Injectable()
export class ImageService {
  private cloudinary = v2;
  private readonly logger = new ProjectLogger('CloudinaryService');

  constructor(private configService: ConfigService) {
    this.cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: any): Promise<UploadedImageResponse> {
    try {
      const response = await v2.uploader.upload(file.path, {
        folder: 'junco',
      });
      return {
        originalName: response.original_filename,
        url: response.secure_url,
        width: response.width,
        height: response.height,
        publicId: response.public_id,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    } finally {
      unlink(file.path, (err) => {
        if (err) {
          this.logger.exception(err.message);
          throw new InternalServerErrorException(err.message);
        }
      });
    }
  }

  async deleteFile(publicId: string): Promise<void> {
    await v2.uploader.destroy(publicId);
  }

  async uploadManyFiles(
    files: Array<Express.Multer.File>,
  ): Promise<UploadedImageResponse[]> {
    const tasks = files.map((file) => {
      return this.uploadFile(file);
    });
    return Promise.all(tasks);
  }
}
