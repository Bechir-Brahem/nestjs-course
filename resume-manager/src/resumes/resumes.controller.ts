import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './classes/utils';
import { CreateResumeDto } from './dto/create-resume.dto';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {
  }

    @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@Body() createResumeDto: CreateResumeDto,@UploadedFile() file) {
      return {
      originalName: file.originalname,
      filename: file.filename,
    };
  }

}
