import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET kategori berdasarkan ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        brandPartners: true,
      },
    });

    if (!category) return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });

    return NextResponse.json(category);
  } catch (error) {
    console.error("❌ Error GET /categories/[id]:", error);
    return NextResponse.json({ error: "Gagal memuat kategori" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama, brandPartnerIds } = body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        nama,
        brandPartners: {
          set: [], // reset dulu
          connect: brandPartnerIds?.map((id: string) => ({ id })) ?? [],
        },
      },
      include: { brandPartners: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}