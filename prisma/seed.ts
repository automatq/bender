import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eliteweb.com' },
    update: {},
    create: {
      email: 'admin@eliteweb.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  });

  console.log('Admin user created:', admin.email);
  console.log('Password: admin123');

  // Create a demo client
  const clientPassword = await bcrypt.hash('client123', 10);
  
  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      password: clientPassword,
      name: 'Demo Client',
      role: 'client',
    },
  });

  console.log('Demo client created:', client.email);
  console.log('Password: client123');

  // Create a demo project
  const project = await prisma.project.create({
    data: {
      title: 'Demo E-commerce Website',
      description: 'A professional e-commerce platform with custom features',
      packageType: 'multi-page',
      price: 8000,
      status: 'in-progress',
      userId: client.id,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-02-01'),
    },
  });

  // Create payment record
  await prisma.payment.create({
    data: {
      amount: 8000,
      status: 'completed',
      projectId: project.id,
    },
  });

  console.log('Demo project created:', project.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
