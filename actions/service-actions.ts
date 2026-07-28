"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("getServices error:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("getServiceBySlug error:", error);
    return null;
  }
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
