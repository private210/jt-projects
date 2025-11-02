import prisma from "@/lib/prisma";

export async function logActivity({ action, entity, entityId, user }: { action: string; entity?: string; entityId?: number; user?: string }) {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        entity,
        entityId,
        user,
      },
    });
  } catch (err) {
    console.error("Gagal mencatat aktivitas:", err);
  }
}
