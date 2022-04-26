import { Module } from '@nestjs/common';
import { ResumesService } from './services/resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '../skills/entities/skill.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Resume,Skill])],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {
}
