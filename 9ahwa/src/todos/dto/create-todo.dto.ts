import { PickType } from "@nestjs/mapped-types";
import { AllTodoDto } from "./all-todo.dto";
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly name: string
  @IsString()
  readonly description: string

}

