import { IsEmail, IsString } from "class-validator";


export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string; 

  @IsString()
  password: string;
}