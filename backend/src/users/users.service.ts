import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createUsers = await this.prismaService.user.create({
        data: createUserDto,
      });
      if (!createUsers) {
        throw new Error('Error creating user');
      } else {
        return createUsers;
      }
    } catch (error) {
      console.error(error);
      return { message: 'Error creating user', errors: [] };
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found'); 
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Error finding user'); 
    }
  }

  async findAll() {
    try {
      const findUser = await this.prismaService.user.findMany;
      if (!findUser) {
        throw new Error('Error finding user');
      } else {
        return findUser;
      }
    } catch (error) {
      console.error(error);
      return {
        message: 'Error fetching users',
        errors: [],
      };
    }
  }

  async findOne(id: number) {
    try {
      const findUser = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
      if (!findUser) {
        throw new Error(`not found  with id ${id} `);
      } else {
        return findUser;
      }
    } catch (error) {
      console.error(error);
      return {
        message: 'Error finding user',
        errors: [],
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
      if (!updateUser) {
        throw new Error('Error updating user');
      } else {
        return updateUser;
      }
    } catch (error) {
      console.error(error);
      return {
        message: 'Error updating user',
        errors: [],
      };
    }
  }

  async remove(id: number) {
    try {
      const removeUser = await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      if (!removeUser) {
        throw new Error('Error removing user');
      } else {
        return removeUser;
      }
    } catch (error) {
      console.error(error);
      return {
        message: 'Error deleting user',
        errors: [],
      };
    }
  }
}
