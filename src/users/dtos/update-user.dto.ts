import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsEmail()
  @IsOptional()
  email: string; 

  @IsString()
  @IsOptional()
  password: string;
}