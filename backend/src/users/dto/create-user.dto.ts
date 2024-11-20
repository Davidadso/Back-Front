import { IsEmail, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  id_rol: number;  
}
3