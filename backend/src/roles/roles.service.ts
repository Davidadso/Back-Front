import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRolDto } from './dto/create-roles.dto';
import { UpdateRolDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateRolDto) {
    try {
      const createRoles = await this.prismaService.rol.create({
        data: createUserDto,
      });
      if (!createRoles) {
        throw new Error('Error creating rol');
      } else {
        return createRoles;
      }
    } catch (error) {
      console.error(error);
      return { message: 'Error creating rol', errors: [] };
    }
  }

  async findAll() {
    try {
      const rolesFound = await this.prismaService.rol.findMany();
      if (!rolesFound) {
        throw new Error('Failed to find categories');
      } else {
        return rolesFound;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findOne(id: number) {
    try {
      const findRoles = await this.prismaService.rol.findUnique({
        where: {
          id,
        },
      });
      if (!findRoles) {
        throw new Error('Error finding user');
      } else {
        return findRoles;
      }
    } catch (error) {
      console.error(error);
      return {
        message: 'Error finding Roles',
        errors: [],
      };
    }
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    try {
      const updateRoles = await this.prismaService.rol.update({
        where: {
          id,
        },
        data: updateRolDto,
      });
      if (!updateRoles) {
        throw new Error('Error updating Roles');
      } else {
        return updateRoles;
      }
    } catch (error) {
      console.error(error);
      return {
        message: 'Error updating Roles',
        errors: [],
      };
    }
  }

  async remove(id: number) {
    try {
      const removeRoles = await this.prismaService.rol.delete({
        where: {
          id,
        },
      });
      if (!removeRoles) {
        throw new Error('Error removing roles');
      } else {
        return removeRoles;
      }
    } catch (error) {
      console.error(error);
      return {
        message: 'Error deleting roles',
        errors: [],
      };
    }
  }
}
