"use server";

import { prisma } from "@/lib/prisma";

export async function globalSearch(query: string) {
  if (!query || query.trim() === "") {
    return { services: [], projects: [], blogs: [], contacts: [] };
  }

  const cleanQuery = query.trim();

  try {
    const [services, projects, blogs, contacts] = await Promise.all([
      prisma.service.findMany({
        where: {
          OR: [
            { title: { contains: cleanQuery, mode: "insensitive" } },
            { description: { contains: cleanQuery, mode: "insensitive" } },
            { slug: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: cleanQuery, mode: "insensitive" } },
            { description: { contains: cleanQuery, mode: "insensitive" } },
            { client: { contains: cleanQuery, mode: "insensitive" } },
            { slug: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.blog.findMany({
        where: {
          OR: [
            { title: { contains: cleanQuery, mode: "insensitive" } },
            { content: { contains: cleanQuery, mode: "insensitive" } },
            { slug: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.contact.findMany({
        where: {
          OR: [
            { name: { contains: cleanQuery, mode: "insensitive" } },
            { email: { contains: cleanQuery, mode: "insensitive" } },
            { message: { contains: cleanQuery, mode: "insensitive" } },
            { service: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
    ]);

    return { services, projects, blogs, contacts };
  } catch (error) {
    console.error("globalSearch error:", error);
    return { services: [], projects: [], blogs: [], contacts: [] };
  }
}
