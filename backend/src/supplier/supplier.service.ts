import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SupplierService {
  constructor(private prismaService: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const supplierFound = this.prismaService.supplier.create({
        data: createSupplierDto,
      });
      if (!supplierFound) {
        throw new Error('Supplier not created');
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  findAll() {
    try {
      const supplierFound = this.prismaService.supplier.findMany();
      if (!supplierFound) {
        throw new Error('Supplier not found my friend');
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findOne(id: number) {
    try {
      const supplierFound = await this.prismaService.supplier.findUnique({
        where: {
          id,
        },
      });
      if (!supplierFound) {
        throw new NotFoundException(`Supplier With ${+id} Found`);
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    try {
      const supplierFound = this.prismaService.supplier.update({
        where: {
          id,
        },
        data: updateSupplierDto,
      });
      if (!supplierFound) {
        throw new NotFoundException(`Supplier with ${+id} Not Found`);
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async remove(id: number) {
    try {
      const supplierFound = await this.prismaService.supplier.delete({
        where: {
          id,
        },
      });
      if (!supplierFound) {
        throw new NotFoundException(`Supplier With ${+id} Found`);
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
