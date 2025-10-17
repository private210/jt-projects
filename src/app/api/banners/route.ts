import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/banners — ambil semua banner
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { urutan: "asc" },
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.error("GET /api/banners error:", error);
    return NextResponse.json({ error: "Gagal memuat data banner" }, { status: 500 });
  }
}

// ✅ POST /api/banners — tambah banner baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, deskripsi, image, urutan, isActive } = body;

    if (!title || !deskripsi) {
      return NextResponse.json({ error: "Judul dan deskripsi wajib diisi" }, { status: 400 });
    }

    const newBanner = await prisma.banner.create({
      data: {
        title,
        deskripsi,
        image: image || null,
        urutan: urutan ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(newBanner);
  } catch (error) {
    console.error("POST /api/banners error:", error);
    return NextResponse.json({ error: "Gagal menambahkan banner" }, { status: 500 });
  }
}
