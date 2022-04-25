import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { FindAllDto } from '../dto/find-all.dto';
import { GroupedTodos } from '../classes/grouped-todos.class';

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

  async findAll(queries: FindAllDto): Promise<Todo[]> {
    const { limit, offset, status, criteria } = queries;
    const paginationOptions = { take: limit, skip: offset };


    if (criteria && status) {
      const queryBuilder = this.todoRepository.createQueryBuilder();
      const query = queryBuilder
        .select('todo')
        .from(Todo, 'todo')
        .where('todo.name = :criteria', { criteria: criteria })
        .orWhere('todo.description = :criteria', { criteria: criteria })
        .andWhere('todo.status = :status', { status: status })
        .take(limit)
        .skip(offset);
      return query.getMany();

    } else if (criteria)
      return await this.todoRepository.find({
        where: [
          { name: criteria }, { description: criteria },
        ],
        ...paginationOptions,
      });
    else if (status)
      return await this.todoRepository.find({ where: { status: status }, ...paginationOptions });
    else
      return await this.todoRepository.find(paginationOptions);
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

  async count(status: TodoStatusEnum): Promise<number> {
    if (status)
      return await this.todoRepository.countBy({ status: status });
    else
      return await this.todoRepository.count();
  }

  async countTodosGrouped() :Promise<GroupedTodos>{
    const queryBuilder = this.todoRepository.createQueryBuilder();
    const query = queryBuilder
      .select('status, count(status) as count')
      .groupBy('status');
    const result=await query.getRawMany();
    let ret= new GroupedTodos();
    for(let elt of result){
      ret[elt.status]=parseInt(elt.count,10);
    }
    return ret;


  }

}

