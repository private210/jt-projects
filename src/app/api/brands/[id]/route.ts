import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const brand = await prisma.brandPartner.findUnique({
      where: { id: params.id },
      include: { categories: true, about: true },
    });
    return NextResponse.json(brand);
  } catch {
    return NextResponse.json({ error: "Brand tidak ditemukan" }, { status: 404 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { nama, image, aboutId, categoryIds } = body;

    const brand = await prisma.brandPartner.update({
      where: { id: params.id },
      data: {
        nama,
        image,
        aboutId,
        categories: {
          set: [],
          connect: categoryIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error PUT brand:", error);
    return NextResponse.json({ error: "Gagal memperbarui brand" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.brandPartner.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Brand dihapus" });
  } catch (error) {
    console.error("Error DELETE brand:", error);
    return NextResponse.json({ error: "Gagal menghapus brand" }, { status: 500 });
  }
}
