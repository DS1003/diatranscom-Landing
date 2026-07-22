"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function getHero() {
  return prisma.hero.findFirst();
}

export async function saveHero(data: any) {
  const existingHero = await prisma.hero.findFirst();
  
  if (existingHero) {
    await prisma.hero.update({
      where: { id: existingHero.id },
      data,
    });
  } else {
    await prisma.hero.create({
      data,
    });
  }
  
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { success: true };
}
