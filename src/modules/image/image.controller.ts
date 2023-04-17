import { AuthenticateGuard } from '@modules/auth/guard/roles.decorator';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ImageService } from './image.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageOption } from '@core/config/image.config';
import { UploadedImageResponse } from '@modules/comment/dto/uploaded-image.response';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // @Post('upload')
  // @AuthenticateGuard()
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       image: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     limits: { fileSize: 5242880 },
  //     fileFilter: imageOption.fileFilter,
  //     dest: './uploads',
  //   }),
  // )
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({
  //   tags: ['image'],
  //   operationId: 'uploadImage',
  //   summary: 'Upload one image',
  //   description: 'Upload one image',
  // })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'Successful',
  // })
  // async uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<UploadedImageResponse> {
  //   return this.imageService.uploadFile(file);
  // }

  // @Post('upload-many')
  // @AuthenticateGuard()
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       images: {
  //         type: 'array',
  //         items: {
  //           type: 'string',
  //           format: 'binary',
  //         },
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(FilesInterceptor('images', 10, imageOption))
  // @ApiOperation({
  //   tags: ['image'],
  //   summary: 'Upload images',
  // })
  // async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   return this.imageService.uploadManyFiles(files);
  // }
}
