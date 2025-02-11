import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const Roles = [
    { name: 'Admin' },
    { name: 'User' },
  ];
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });