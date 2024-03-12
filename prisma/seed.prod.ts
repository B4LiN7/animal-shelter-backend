import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database');
    throw error;
  }
}
async function addAdminUser() {
  console.log('Checking admin user... ');
  const admin = await prisma.user.findFirst({
    where: {
      username: 'admin',
    },
  });
  if (admin && admin.role === Role.ADMIN) {
    console.log('admin user with ADMIN role already exists, skip.');
    return;
  }
  if (admin) {
    console.log(`delete non ADMIN role user... `);
    await prisma.user.delete({ where: { userId: admin.userId } });
  }

  const newAdmin = await prisma.user.create({
    data: {
      username: 'admin',
      name: 'Admin User',
      hashedPassword: await hashPassword('password'),
      role: Role.ADMIN,
    },
  });
  console.log(`admin user created with user ID ${newAdmin.userId}.`);
}
export async function main() {
  await checkDatabaseConnection();
  await addAdminUser();
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
