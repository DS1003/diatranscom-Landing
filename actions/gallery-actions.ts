"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServiceGallery(serviceId: string) {
  try {
    return await prisma.serviceMedia.findMany({
      where: { serviceId },
      orderBy: { order: "asc" },
      include: {
        project: {
          select: { title: true, slug: true }
        }
      }
    });
  } catch (error) {
    console.error("getServiceGallery error:", error);
    return [];
  }
}

export async function addServiceMedia(data: any) {
  try {
    // Determine the next order index
    const lastItem = await prisma.serviceMedia.findFirst({
      where: { serviceId: data.serviceId },
      orderBy: { order: "desc" },
    });
    
    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const media = await prisma.serviceMedia.create({
      data: {
        ...data,
        order: newOrder,
        date: data.date ? new Date(data.date) : null,
        projectId: data.projectId || null,
      },
    });
    
    revalidatePath(`/admin/services`);
    revalidatePath(`/services`);
    return media;
  } catch (error) {
    console.error("addServiceMedia error:", error);
    throw new Error("Erreur lors de l'ajout du média");
  }
}

export async function updateServiceMedia(id: string, data: any) {
  try {
    const formattedData = { ...data };
    if (formattedData.date !== undefined) {
      formattedData.date = formattedData.date ? new Date(formattedData.date) : null;
    }
    if (formattedData.projectId !== undefined) {
      formattedData.projectId = formattedData.projectId || null;
    }

    const media = await prisma.serviceMedia.update({
      where: { id },
      data: formattedData,
    });
    
    revalidatePath(`/admin/services`);
    revalidatePath(`/services`);
    return media;
  } catch (error) {
    console.error("updateServiceMedia error:", error);
    throw new Error("Erreur lors de la mise à jour du média");
  }
}

export async function deleteServiceMedia(id: string) {
  try {
    await prisma.serviceMedia.delete({
      where: { id },
    });
    
    revalidatePath(`/admin/services`);
    revalidatePath(`/services`);
    return true;
  } catch (error) {
    console.error("deleteServiceMedia error:", error);
    throw new Error("Erreur lors de la suppression du média");
  }
}

export async function reorderServiceMedia(items: { id: string, order: number }[]) {
  try {
    // Prisma doesn't have a bulk update with different values easily,
    // so we use a transaction.
    const updates = items.map((item) =>
      prisma.serviceMedia.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    );

    await prisma.$transaction(updates);
    
    revalidatePath(`/admin/services`);
    revalidatePath(`/services`);
    return true;
  } catch (error) {
    console.error("reorderServiceMedia error:", error);
    throw new Error("Erreur lors de la réorganisation");
  }
}

export async function setServiceMediaCover(id: string, serviceId: string) {
  try {
    await prisma.$transaction([
      // Unset previous cover
      prisma.serviceMedia.updateMany({
        where: { serviceId, isCover: true },
        data: { isCover: false },
      }),
      // Set new cover
      prisma.serviceMedia.update({
        where: { id },
        data: { isCover: true },
      }),
    ]);
    
    revalidatePath(`/admin/services`);
    revalidatePath(`/services`);
    return true;
  } catch (error) {
    console.error("setServiceMediaCover error:", error);
    throw new Error("Erreur lors de la définition de la couverture");
  }
}
