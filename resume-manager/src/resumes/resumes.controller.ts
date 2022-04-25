import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ResumesService } from './services/resumes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './classes/utils';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ResumeEntity } from './entities/resume.entity';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

const multerOptions = FileInterceptor('file', {
  limits: {
    fieldNameSize: 300,
    fileSize: 1048576, // 1 MB
  },
  storage: diskStorage({
    destination: './files',
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
});

@Controller('resumes')
export class ResumesController {

  constructor(private readonly resumesService: ResumesService) {
  }

  @Post()
  @UseInterceptors(multerOptions)
  async uploadedFile(@Body() createResumeDto: CreateResumeDto, @UploadedFile() file) {
    return this.resumesService.create(file, createResumeDto);
  }

  @Get()
  async getAll() {
    return this.resumesService.findAll();
  }
  @Get(":id([0-9]+)")
  async getOne(@Param('id') id :number){
    return this.resumesService.findOne(id);
  }

  @Patch(':id([0-9]+)')
  @UseInterceptors(multerOptions)
  async update(
    @Param('id') id: number,
    @Body() updateResumeDto: UpdateResumeDto,
    @UploadedFile() file,
  ): Promise<ResumeEntity> {
    return this.resumesService.update(id, updateResumeDto, file);
  }

  @Delete(':id([0-9]+)')
  async delete(@Param('id')id :number) : Promise<DeleteResult> {
    return this.resumesService.remove(id)
  }

}
