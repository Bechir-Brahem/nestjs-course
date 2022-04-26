import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }


  async create(createUserDto: CreateUserDto): Promise<User> {
    let obj={ ...createUserDto, resumes: [] }
    console.log(obj)
    const user = await this.userRepository.create(obj);
    console.log(user)
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['resumes','resumes.skills'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['resumes','resumes.skills'],
    });
    if (!user)
      throw new NotFoundException('user not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user)
      throw new NotFoundException('user not found');
    return await this.userRepository.save(user);

  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
