import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { UpdateResumeDto } from '../dto/update-resume.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from '../entities/resume.entity';
import { unlink } from 'fs';
import { Skill } from '../../skills/entities/skill.entity';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';


@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
   private readonly userService:UsersService
  ) {
  }

  async create(file: Express.Multer.File, createResumeDto: CreateResumeDto): Promise<Resume> {
    const skills = await Promise.all(
      createResumeDto.skills.map(name =>this.preloadSkillByName(name)),
    );

    const user = await this.userService.findOne(createResumeDto.user);

    let resume = this.resumeRepository.create({
      ...createResumeDto,
      skills,
      path: file.path,
      user:user
    });
    return await this.resumeRepository.save(resume);
  }

  async findAll(): Promise<Resume[]> {
    return await this.resumeRepository.find({
      relations: ['skills','user'],
    });
  }

  async findOne(id: number): Promise<Resume> {
    const res = await this.resumeRepository.findOne({
      where: { id: id },
      relations: ['skills','user'],
    });
    if (!res) {
      throw new NotFoundException('resume not found');
    }
    return res;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto, file: Express.Multer.File): Promise<Resume> {

    const skills = updateResumeDto.skills && await Promise.all(
      updateResumeDto.skills.map(name =>this.preloadSkillByName(name)),
    );

    let user=null;
    if(updateResumeDto.user) {
      user= await this.userService.findOne(updateResumeDto.user);
    }
    else{
      let tmp = await this.resumeRepository.findOneBy({id:id})
      user = await this.userService.findOne(id)
    }

    let resume = await this.resumeRepository.preload({
      id:id,
      ...updateResumeDto,
      skills,
      user,
    });
    if (!resume) {
      throw  new NotFoundException('resume not found');
    }
    if (file) {
      this.deleteFile(resume.path);
      resume.path = file.path;
    }

    return this.resumeRepository.save(resume);
  }

  async remove(id: number): Promise<DeleteResult> {
    const res = await this.findOne(id);
    this.deleteFile(res.path);
    return await this.resumeRepository.delete(id);
  }

  private async preloadSkillByName(name: string): Promise<Skill> {
    const existingSkill = await this.skillRepository.findOneBy({ name });
    if (existingSkill) {
      return existingSkill;
    }
    return this.skillRepository.create({ name });
  }
  private deleteFile = (path) => {
    unlink(path, (err) => {
      if (err) {
        throw new InternalServerErrorException('could not delete file ' + path);
      }
      console.log(`deletion ${path} successful`);

    });
  };
}
