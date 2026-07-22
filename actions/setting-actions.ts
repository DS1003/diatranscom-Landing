"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const settings = await prisma.setting.findMany();
    return settings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("getSettings error:", error);
    return {};
  }
}

export async function saveSettings(data: any) {
  for (const [key, value] of Object.entries(data)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: value as any },
      create: { key, value: value as any },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}
