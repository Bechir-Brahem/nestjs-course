import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManageTodoService {

  constructor(private configService: ConfigService,
              @InjectRepository(Todo)
              private readonly todoRepository: Repository<Todo>) {
  }

  async addTodo(newTodo: CreateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.create(newTodo);
    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, updatedTodo: UpdateTodoDto) {
    const todo = await this.todoRepository.preload({
      id: id,
      ...updatedTodo,
    });
    if (!todo) {
      throw new NotFoundException('todo not found');
    }
    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<Todo> {
    const todo = await this.findOne(id);
    return this.todoRepository.remove(todo);


  }

}

