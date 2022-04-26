import { PickType } from "@nestjs/mapped-types";
import { AllTodoDto } from "./all-todo.dto";

export class CreateTodoDto extends PickType(AllTodoDto,['name',"description"]){

}

