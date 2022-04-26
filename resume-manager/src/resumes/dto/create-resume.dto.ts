import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}
export class CreateResumeDto {

  @IsString()
  readonly first_name: string;
  @IsString()
  readonly last_name: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly age: number;

  @IsString({ each: true })
  @IsNotEmpty({each:true})
  @IsArray({message:'skills is not a string'})
  @Transform(data => {
    if(isString(data.value))
      return  data.value.split(',')
    return null
  })
  readonly skills: string[];
}
