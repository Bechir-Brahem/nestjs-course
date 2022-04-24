import { IsEnum, IsObject, IsString } from "class-validator";
import { TodoStatusEnum } from '../enums/todo-status.enum';
export class AllTodoDto {
  @IsString()
  readonly name: string
  @IsString()
  readonly description: string
  @IsEnum(TodoStatusEnum)
  readonly status :TodoStatusEnum
}
