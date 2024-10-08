import { IsString, IsNumber } from "class-validator";

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  contactInfo: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
