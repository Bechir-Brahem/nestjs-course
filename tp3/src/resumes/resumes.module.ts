import { Module } from '@nestjs/common';
import { ResumesService } from './services/resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '../skills/entities/skill.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';


@Module({
  imports: [TypeOrmModule.forFeature([Resume,Skill,User])],
  controllers: [ResumesController],
  providers: [ResumesService,UsersService],
})
export class ResumesModule {
}
