import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { ManageTodoService } from './todo-manager/todo-manager';

@Module({
  controllers: [TodosController],
  providers: [ManageTodoService]
})
export class TodosModule {}
