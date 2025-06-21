const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log("DB connected!");
  } catch (e) {
    console.error("DB connection error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
