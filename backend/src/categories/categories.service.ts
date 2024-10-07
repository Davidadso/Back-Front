import { Injectable } from '@nestjs/common';
import { CreateCategoriesDto } from './dto/create-category.dto';
import { UpdateCategoriesDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoriesDto: CreateCategoriesDto) {
    try {
      const createCategories = await this.prismaService.categories.create({
        data: createCategoriesDto,
      });
      if (!createCategories) {
        throw new Error('Failed to create category');
      }
      return createCategories;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findAll() {
    try {
      const categoriesFound = await this.prismaService.categories.findMany();
      if (!categoriesFound) {
        throw new Error('Failed to find categories');
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findOne(id: number) {
    try {
      const categoriesFound = await this.prismaService.categories.findUnique({
        where: {
          id,
        },
      });
      if (!categoriesFound) {
        throw new Error(`Failed to find with ${+id} category`);
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async update(id: number, updateCategoriesDto: UpdateCategoriesDto) {
    try {
      const categoriesFound = await this.prismaService.categories.update({
        where: {
          id,
        },
        data: updateCategoriesDto,
      });
      if (!categoriesFound) {
        throw new Error(`Failed to update with ${+id} category`);
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async remove(id: number) {
    try {
      const categoriesFound = await this.prismaService.categories.delete({
        where: {
          id,
        },
      });

      if (!categoriesFound) {
        throw new Error(`Failed to delete with ${+id} category`);
      } else {
        return categoriesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
