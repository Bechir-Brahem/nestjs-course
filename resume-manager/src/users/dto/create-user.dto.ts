import { IsAlphanumeric, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(10)
  @IsString()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @MinLength(6)
  @MaxLength(14)
  @IsString()
  password: string;
}
