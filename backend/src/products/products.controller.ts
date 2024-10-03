import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Search,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    try {
      const productFound = await this.productsService.findAll();
      if (!productFound) {
        throw new NotFoundException(
          `Product with id ${productFound} not found`,
        );
      } else {
        return productFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`${id}`);
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get('search')
  async Search(@Query('query') query: string) {
    if (!query || query === '') {
      throw new HttpException(
        'No se Encuentra Parametro de Busqueda.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.productsService.Search(query);
  }
}
