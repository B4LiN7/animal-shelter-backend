import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

export async function main() {
  const admin = await prisma.user.findFirst({
    where: {
      userName: 'admin',
      role: Role.ADMIN,
    },
  });
  if (!admin) {
    console.log('Admin user already exists');
    return;
  }

  const user = await prisma.user.create({
    data: {
      userName: 'admin',
      hashedPassword: await hashPassword('password'),
      role: Role.ADMIN,
    },
  });

  const location = await prisma.location.create({
    data: {
      userId: user.userId,
      name: 'Test Location',
      country: 'Test Country',
      city: 'Test City',
      zipCode: 12345,
      address: 'Test Address',
    },
  });

  console.log({ user, location });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
