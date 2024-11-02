import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-roles.dto';
import { UpdateRolDto } from './dto/update-roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRolesDto: CreateRolDto) {
    try {
      return await this.rolesService.create(createRolesDto);
    } catch (error) {
      console.error(error);
      return {
        message: 'Error al crear el rol',
        errors: [],
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const rolFound = await this.rolesService.findAll();
      if (!rolFound) {
        throw new NotFoundException('No se encontraron roles');
      } else {
        return rolFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const rolFound = await this.rolesService.findOne(+id);
      if (!rolFound) {
        throw new NotFoundException('No se encontró el rol');
      } else {
        return rolFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    try {
      const rolFound = await this.rolesService.update(+id, updateRolDto);
      if (!rolFound) {
        throw new NotFoundException('No se encontró el rol');
      } else {
        return rolFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const roleDelete = await this.rolesService.remove(+id);
      if (!roleDelete) {
        throw new NotFoundException('No se encontró el rol');
      } else {
        return roleDelete;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
