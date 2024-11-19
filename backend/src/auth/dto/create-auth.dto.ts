import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @MinLength(1)
    @IsString()
    userName: string;

    @IsEmail()
    email: string;   

    @IsString()
    @MinLength(6)
    password: string;


  
    @MinLength(1)
    @IsNumber()
    id_rol: number;  
}
