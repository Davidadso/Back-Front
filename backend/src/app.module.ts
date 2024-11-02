import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { SupplierModule } from './supplier/supplier.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { RolesModule } from './roles/roles.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ProductsModule, CategoriesModule, SupplierModule, UsersModule, AuthModule, RolesModule],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AppModule {}
