import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET /api/categories/[id]
export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        brandPartners: true,
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("❌ Error GET /categories/[id]:", error);
    return NextResponse.json({ error: "Gagal memuat kategori" }, { status: 500 });
  }
}

// ✅ PUT /api/categories/[id]
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const { nama, brandPartnerIds } = body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        nama,
        brandPartners: {
          set: [], // reset dulu
          connect: brandPartnerIds?.map((bid: string) => ({ id: bid })) ?? [],
        },
      },
      include: { brandPartners: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("❌ Error PUT /categories/[id]:", error);
    return NextResponse.json({ error: "Gagal memperbarui kategori" }, { status: 500 });
  }
}

// ✅ DELETE /api/categories/[id]
export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error("❌ Error DELETE /categories/[id]:", error);
    return NextResponse.json({ error: "Gagal menghapus kategori" }, { status: 500 });
  }
}
