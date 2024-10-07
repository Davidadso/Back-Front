import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [ProductsModule, CategoriesModule, SupplierModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
