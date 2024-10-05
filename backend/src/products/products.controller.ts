import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
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
  async findOne(@Param('id') id: string) {
    console.log(`${id}`);
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }

  @Get('search')
  async searchProducts(@Query('value') value: string) {
    if (!value || value === '') {
      throw new HttpException(
        'No se Encuentra Parámetro de Búsqueda.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.productsService.searchAutocomplete(value);
  }
}
