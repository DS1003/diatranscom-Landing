"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("getTestimonials error:", error);
    return [];
  }
}

export async function createTestimonial(data: any) {
  await prisma.testimonial.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function updateTestimonial(id: string, data: any) {
  await prisma.testimonial.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
