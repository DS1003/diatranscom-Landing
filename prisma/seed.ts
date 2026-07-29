import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("diatrans@2026", 10);

  // Delete the old .com admin to clean up the database
  try {
    await prisma.user.deleteMany({
      where: { email: "admin@diatranscom.com" }
    });
  } catch (e) {
    console.log("No old admin to delete");
  }

  const admin = await prisma.user.upsert({
    where: { email: "admin@diatranscom.sn" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: "admin@diatranscom.sn",
      name: "Super Admin",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Super Admin seeded:", admin.email);

  // You can seed initial settings or pages here if you want
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
