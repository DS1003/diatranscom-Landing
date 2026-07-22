"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function getAbout() {
  return prisma.about.findFirst();
}

export async function saveAbout(data: any) {
  const existingAbout = await prisma.about.findFirst();
  
  if (existingAbout) {
    await prisma.about.update({
      where: { id: existingAbout.id },
      data,
    });
  } else {
    await prisma.about.create({
      data,
    });
  }
  
  revalidatePath("/");
  revalidatePath("/admin/about");
  return { success: true };
}
