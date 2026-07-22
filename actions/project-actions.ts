"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("getProjects error:", error);
    return [];
  }
}

export async function createProject(data: any) {
  await prisma.project.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProject(id: string, data: any) {
  await prisma.project.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}
