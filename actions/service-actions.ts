"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function getServices() {
  return prisma.service.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createService(data: any) {
  const service = await prisma.service.create({
    data,
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
  return service;
}

export async function updateService(id: string, data: any) {
  const service = await prisma.service.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
  return service;
}

export async function deleteService(id: string) {
  await prisma.service.delete({
    where: { id },
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
}
