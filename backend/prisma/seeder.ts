import { Prisma, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const main = async () => {
  const roles: Prisma.RolCreateManyArgs = {
    data: [
      { id: 1, name: 'admin', description: 'administrador' },
      { id: 2, name: 'empleado', description: 'usuario empleado' },
    ],
  };

  await prismaClient.rol.createMany(roles);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  } );
