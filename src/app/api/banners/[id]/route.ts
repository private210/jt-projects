import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/banners/[id]
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id: params.id },
    });

    if (!banner) {
      return NextResponse.json({ error: "Banner tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error("GET /api/banners/[id] error:", error);
    return NextResponse.json({ error: "Gagal mengambil data banner" }, { status: 500 });
  }
}

// ✅ PUT /api/banners/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, deskripsi, image, urutan, isActive } = body;

    const updatedBanner = await prisma.banner.update({
      where: { id: params.id },
      data: {
        title,
        deskripsi,
        image: image || null,
        urutan: urutan ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error("PUT /api/banners/[id] error:", error);
    return NextResponse.json({ error: "Gagal memperbarui banner" }, { status: 500 });
  }
}

// ✅ DELETE /api/banners/[id]
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.banner.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Banner berhasil dihapus" });
  } catch (error) {
    console.error("DELETE /api/banners/[id] error:", error);
    return NextResponse.json({ error: "Gagal menghapus banner" }, { status: 500 });
  }
}
