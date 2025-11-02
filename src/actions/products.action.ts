"use server";
import { prisma } from "@/lib/prisma";

export async function deleteProducts(ids: string[]) {
  try {
    await prisma.product.deleteMany({
      where: { id: { in: ids } },
    });
  } catch (err) {
    console.error("Gagal menghapus produk:", err);
    throw err;
  }
}

export async function toggleFavorite(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { isFavorite: true },
    });
    if (!product) throw new Error("Produk tidak ditemukan");

    await prisma.product.update({
      where: { id },
      data: { isFavorite: !product.isFavorite },
    });
  } catch (err) {
    console.error("Gagal toggle favorit:", err);
    throw err;
  }
}
