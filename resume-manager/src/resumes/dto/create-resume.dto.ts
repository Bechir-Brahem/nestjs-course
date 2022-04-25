import { IsNumber, IsString } from 'class-validator';

export class CreateResumeDto {

  @IsString()
  readonly first_name: string;
  @IsString()
  readonly last_name: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly age:number
}
