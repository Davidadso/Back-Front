import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Product with name ${createProductDto.name} already exists`,
          );
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.prismaService.product.findMany();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findOne(id: number) {
    try {
      console.log('ID recibido :', id);
      const productFound = await this.prismaService.product.findUnique({
        where: {
          id,
        },
      });

      if (!productFound) {
        throw new NotFoundException(`product with id ${id} not found`);
      }

      return await productFound;
    } catch (error) {
      console.error(error)
      throw new NotFoundException(`not found product with id ${id}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productFound = await this.prismaService.product.update({
        where: {
          id,
        },
        data: updateProductDto,
      });

      if (!productFound) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return productFound;
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number) {
    const deletedProduct = await this.prismaService.product.delete({
      where: {
        id,
      },
    });

    if (!deletedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return deletedProduct;
  }

  async searchAutocomplete(value: string) {
    try {
      return await this.prismaService.product.findMany({
        where: {
          name: {
            contains: value,
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      console.error('Error en la búsqueda de productos:', error);
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
