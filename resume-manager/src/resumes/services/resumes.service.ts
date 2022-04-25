import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { UpdateResumeDto } from '../dto/update-resume.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResumeEntity } from '../entities/resume.entity';
import { unlink } from 'fs';

const deleteFile = (path) => {
  unlink(path, (err) => {
    if (err) {
      throw new InternalServerErrorException('could not delete file ' + path);
    }
    console.log(`deletion ${path} successful`);

  });
};

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ResumeEntity)
    private readonly resumeRepository: Repository<ResumeEntity>) {
  }

  async create(file: Express.Multer.File, createResumeDto: CreateResumeDto): Promise<ResumeEntity> {
    let resume = await this.resumeRepository.create(createResumeDto);
    resume.path = file.path;
    return this.resumeRepository.save(resume);
  }

  async findAll(): Promise<ResumeEntity[]> {
    return await this.resumeRepository.find();
  }

  async findOne(id: number): Promise<ResumeEntity> {
    const res = await this.resumeRepository.findOneBy({ id: id });
    if (!res) {
      throw new NotFoundException('resume not found');
    }
    return res;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto, file: Express.Multer.File): Promise<ResumeEntity> {
    let resume = await this.resumeRepository.preload({
      id: id,
      ...updateResumeDto,
    });
    if (!resume) {
      throw  new NotFoundException('resume not found');
    }
    if (file) {
      deleteFile(resume.path);
      resume.path = file.path;

    }
    return this.resumeRepository.save(resume);
  }

  async remove(id: number): Promise<DeleteResult> {
    const res = await this.findOne(id);
    deleteFile(res.path);
    return await this.resumeRepository.delete(id);
  }
}
