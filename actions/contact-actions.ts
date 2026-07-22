"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getContacts() {
  try {
    return await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("getContacts error:", error);
    return [];
  }
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
