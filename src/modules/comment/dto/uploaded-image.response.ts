import { ApiProperty } from '@nestjs/swagger';

export class UploadedImageResponse {
  @ApiProperty()
  public url: string;

  @ApiProperty()
  public width: number;

  @ApiProperty()
  public height: number;

  @ApiProperty()
  public originalName: string;

  @ApiProperty()
  public publicId: string;
}
