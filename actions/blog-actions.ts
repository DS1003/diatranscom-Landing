"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function getPosts() {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
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
