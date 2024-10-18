// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('adminpassword', 10);

  // Create an admin user
  await prisma.asaUser.create({
    data: {
      UserName: 'admin',
      Password: hashedPassword,
      AccessLevel: 'Admin',
      Owner: 'Company',
      PhoneNumber: '1234567890',
      SubmitDate: new Date(),
      SubmitTime: new Date(),
      RepresentativeCode: 'REP001',
    },
  });

  console.log('Admin user created!');
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
