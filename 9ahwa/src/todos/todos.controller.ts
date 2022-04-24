import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import {Todo} from "./entities/todo.entity"
import { ManageTodoService } from './todo-manager/todo-manager';
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("todo")
export class TodosController {
  constructor(private readonly manageTodos: ManageTodoService) {
  }

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.manageTodos.findAll();
  }

  @Get(":id")
  getTodo(@Param("id") id: number): Promise<Todo>{
    return  this.manageTodos.findOne(id);
  }

  @Post()
  addTodo(@Body() newTodo: CreateTodoDto): Promise<Todo>{
    return this.manageTodos.addTodo(newTodo);
  }

  @Patch(":id")
  updateTodo(@Body() cuteTodo: UpdateTodoDto, @Param("id") id: number): Promise<Todo> {
    return this.manageTodos.update(id, cuteTodo);
  }

  @Delete(":id")
  deleteTodo(@Param("id") id: number): Promise<Todo> {
    return this.manageTodos.delete(id);
  }
}
