"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAbout() {
  try {
    return await prisma.about.findFirst();
  } catch (error) {
    console.error("getAbout error:", error);
    return null;
  }
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
