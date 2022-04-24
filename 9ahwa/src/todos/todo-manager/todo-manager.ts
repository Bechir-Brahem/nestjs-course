import { Injectable } from '@nestjs/common';
import {Todo} from "../entities/todo.entity"
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { CreateTodoDto } from "../dto/create-todo.dto";

@Injectable()
export class ManageTodoService {
  private static lastId=0;

  todos: Todo[] = [];

  addTodo(newTodo: CreateTodoDto) {
    let todo = new Todo();
    todo.id = ManageTodoService.lastId++;
    todo = { ...todo, ...newTodo };
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    console.log(this.todos)
    for (let todo of this.todos) {
      if (todo.id == id) {
        return todo;
      }
    }
    return null;
  }

  update(id: number, updatedTodo: UpdateTodoDto): Todo {
    for (let i in this.todos) {
      if (this.todos[i].id == id) {
        this.todos[i] = { ...this.todos[i], ...updatedTodo };
        return this.todos[i]
      }
    }
    return null

  }

  delete(id: number): Todo {
    for (let i in this.todos) {
      if (this.todos[i].id == id) {
        let tmp = this.todos[i];
        this.todos.splice(Number(i), 1);
        return tmp;
      }
    }
    return null;
  }

}

