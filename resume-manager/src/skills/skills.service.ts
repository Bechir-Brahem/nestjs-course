import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SkillEntity } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>) {
  }

  async create(createSkillDto: CreateSkillDto) {
    let skill=this.skillRepository.create(createSkillDto);
    return await this.skillRepository.save(skill)
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOneBy({ id: id });
    if (!skill) {
      throw new NotFoundException('skill not found');
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.preload({
      id: id,
      ...updateSkillDto,
    });
    return await this.skillRepository.save(skill);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.skillRepository.delete(id);
  }
}
