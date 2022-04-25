import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UploadedFile } from '@nestjs/common';

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
