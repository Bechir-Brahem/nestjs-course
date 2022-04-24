import { IsEnum, IsObject, IsString } from "class-validator";
import { TodoStatusEnum } from '../enums/todo-status.enum';
export class AllTodoDto {
  @IsString()
  public name: string
  @IsString()
  public description: string
  @IsEnum(TodoStatusEnum)
  public status :TodoStatusEnum
}
