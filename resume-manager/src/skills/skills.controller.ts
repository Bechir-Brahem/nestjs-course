import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UniqueViolationFilter } from '../filters/unique-violation.filter';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {
  }

  @Post()
  @UseFilters(new UniqueViolationFilter('skill'))
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id([0-9]+)')
  findOne(@Param('id') id: number) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id([0-9]+)')
  @UseFilters(new UniqueViolationFilter('skill'))
  update(@Param('id') id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id([0-9]+)')
  remove(@Param('id') id: number) {
    return this.skillsService.remove(id);
  }
}
