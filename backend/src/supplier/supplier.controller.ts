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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    try {
      const supplierFound =
        await this.supplierService.create(createSupplierDto);
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

  @Get()
  async findAll() {
    try {
      const supplierFound = await this.supplierService.findAll();
      if (!supplierFound) {
        throw new Error(`Suppliers Not Found`);
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const supplierFound = await this.supplierService.findOne(+id);
      if (!supplierFound) {
        throw new NotFoundException(`Supplier With ${+id} Not Found`);
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    try {
      const supplierFound = await this.supplierService.update(
        +id,
        updateSupplierDto,
      );
      if (!supplierFound) {
        throw new NotFoundException(`Supplier With ${+id} Not Found`);
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const supplierFound = await this.supplierService.findOne(+id);
      if (!supplierFound) {
        throw new NotFoundException(`Supplier With ${+id} Not Found`);
      } else {
        return supplierFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
