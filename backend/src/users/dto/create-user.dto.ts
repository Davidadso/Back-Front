// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  id_rol: number;  // Aquí estás esperando un `id_rol`, no un objeto `rol`
}
