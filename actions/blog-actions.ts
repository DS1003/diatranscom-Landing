"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  try {
    return await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("getPosts error:", error);
    return [];
  }
}

export async function createPost(data: any) {
  const post = await prisma.blog.create({
    data: {
      ...data,
      publishedAt: data.isActive ? new Date() : null,
    }
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return post;
}

export async function updatePost(id: string, data: any) {
  const post = await prisma.blog.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return post;
}

export async function deletePost(id: string) {
  await prisma.blog.delete({
    where: { id },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
