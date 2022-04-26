import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { ManageTodoService } from './todo-manager/todo-manager';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindAllDto } from './dto/find-all.dto';
import { CountByStatusDto } from './dto/count-by-status.dto';
import { GroupedTodos } from './classes/grouped-todos.class';

@Controller('todo')
export class TodosController {
  constructor(private readonly manageTodos: ManageTodoService) {
  }

  @Get()
  getTodos(@Query() queries: FindAllDto): Promise<Todo[]> {
    return this.manageTodos.findAll(queries);
  }

  @Get(':id([0-9]+)')
  getTodo(@Param('id') id: number): Promise<Todo> {
    return this.manageTodos.findOne(id);
  }

  @Post()
  addTodo(@Body() newTodo: CreateTodoDto): Promise<Todo> {
    return this.manageTodos.addTodo(newTodo);
  }

  @Patch(':id([0-9]+)')
  updateTodo(@Body() cuteTodo: UpdateTodoDto, @Param('id') id: number): Promise<Todo> {
    return this.manageTodos.update(id, cuteTodo);
  }

  @Delete(':id([0-9]+)')
  deleteTodo(@Param('id') id: number): Promise<Todo> {
    return this.manageTodos.delete(id);
  }

  @Get('count')
  countTodos(@Query() queries: CountByStatusDto): Promise<number> {
    const { status } = queries;
    return this.manageTodos.count(status);
  }

  @Get('count/grouped/')
  countTodosGrouped() : Promise<GroupedTodos> {
    return this.manageTodos.countTodosGrouped();
  }

}
