import { IsString, IsNumber } from "class-validator";

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}
