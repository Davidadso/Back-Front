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

  @IsNumber()
  stock: number;

  @IsString()
  image: string;

  @IsNumber()
  categoryId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.image = image;
    this.categoryId = categoryId;
  }
}
