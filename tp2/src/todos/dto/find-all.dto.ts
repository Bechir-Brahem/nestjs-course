import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';

export class FindAllDto {

  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsPositive()
  @IsOptional()
  readonly offset: number;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  readonly status: TodoStatusEnum;

  @IsOptional()
  @IsString()
  readonly criteria: string;
}