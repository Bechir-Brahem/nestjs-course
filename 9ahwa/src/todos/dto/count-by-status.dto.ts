import { PickType } from "@nestjs/mapped-types";
import { AllTodoDto } from "./all-todo.dto";
import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../enums/todo-status.enum';

export class CountByStatusDto {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  readonly status : TodoStatusEnum;

}

