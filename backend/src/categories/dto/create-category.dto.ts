import { Categories } from '@prisma/client';

export type CreateCategoriesDto = Omit<
  Categories,
  'id' | 'createdAt' | 'updatedAt'
>;
