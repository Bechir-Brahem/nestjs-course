import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { ManageTodoService } from './todo-manager/todo-manager';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [ManageTodoService],
})
export class TodosModule {
}
