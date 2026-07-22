"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getHero() {
  try {
    return await prisma.hero.findFirst();
  } catch (error) {
    console.error("getHero error:", error);
    return null;
  }
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
