"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function getContacts() {
  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markContactAsRead(id: string) {
  const contact = await prisma.contact.update({
    where: { id },
    data: { status: "READ" },
  });
  revalidatePath("/admin/contacts");
  return contact;
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({
    where: { id },
  });
  revalidatePath("/admin/contacts");
}

export async function submitContact(data: { name: string; email: string; phone?: string; service?: string; message: string }) {
  await prisma.contact.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      message: data.message,
      status: "NEW"
    }
  });
}
