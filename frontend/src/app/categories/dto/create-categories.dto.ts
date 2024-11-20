import { IsString, IsNumber } from "class-validator";

export class CategoríaDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;


  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
