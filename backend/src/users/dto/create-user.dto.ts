import { IsEmail, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  idRol: number;  
}
3