import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-category.dto';
import { UpdateCategoriesDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoriesDto: CreateCategoriesDto) {
    try {
      return await this.categoriesService.create(createCategoriesDto);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Get()
  async findAll() {
    try {
      const categoriesFound = await this.categoriesService.findAll();
      if (!categoriesFound) {
        throw new NotFoundException(
          `Categories with id ${categoriesFound} not found`,
        );
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const categoriesFound = await this.categoriesService.findOne(+id);
      if (!categoriesFound) {
        throw new NotFoundException(`Categories with ${id} Not Found`);
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoriesDto: UpdateCategoriesDto,
  ) {
    try {
      const categoriesFound = await this.categoriesService.update(
        +id,
        updateCategoriesDto,
      );
      if (!categoriesFound) {
        throw new NotFoundException(`Categories with ${+id} Not Found`);
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const categoriesFound = await this.categoriesService.remove(+id);
      if (!categoriesFound) {
        throw new NotFoundException(`Categories with ${+id} Not Found`);
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
