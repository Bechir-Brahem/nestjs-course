import { Module } from '@nestjs/common';
import { ResumesService } from './services/resumes.service';
import { ResumesController } from './resumes.controller';
import { ResumeEntity } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ResumeEntity])],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {
}
