import { PartialType } from "@nestjs/mapped-types";
import { AllTodoDto } from "./all-todo.dto";

export class UpdateTodoDto extends PartialType(AllTodoDto) {
}
