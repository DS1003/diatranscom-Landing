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
  const abouts = await prisma.about.findMany({
    orderBy: { id: 'asc' }
  });
  
  if (abouts.length > 0) {
    const targetAbout = abouts[0];
    
    // Clean up any duplicates if they exist
    if (abouts.length > 1) {
      for (let i = 1; i < abouts.length; i++) {
        await prisma.about.delete({ where: { id: abouts[i].id } });
      }
    }

    await prisma.about.update({
      where: { id: targetAbout.id },
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
