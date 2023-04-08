import { ProjectLogger } from '@core/loggers';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { unlink } from 'fs';
import { UploadedImageResponse } from './response/uploaded-image.response';

@Injectable()
export class CloudinaryService {
  private readonly logger = new ProjectLogger('CloudinaryService');
  async uploadImage(file: Express.Multer.File): Promise<UploadedImageResponse> {
    try {
      const response = await v2.uploader.upload(file.path, {
        folder: 'eshopping',
      });
      return {
        originalName: response.original_filename,
        url: response.secure_url,
        width: response.width,
        height: response.height,
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
}
