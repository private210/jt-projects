import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * API Endpoint: /api/brand-partner
 *
 * Supports:
 * - GET (all brands or by ID using ?id=xxx)
 * - POST (create new brand)
 * - PUT (update brand by id in body)
 * - DELETE (delete brand by id in body or query)
 */

// 🟢 GET — semua brand atau berdasarkan ID (via query ?id=)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // GET berdasarkan ID
      const brand = await prisma.brandPartner.findUnique({
        where: { id },
        include: { about: true, categories: true },
      });
      if (!brand) {
        return NextResponse.json({ error: "Brand tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json(brand);
    }

    // GET semua brand
    const brands = await prisma.brandPartner.findMany({
      include: { about: true, categories: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(brands);
  } catch (error) {
    console.error("Error GET brands:", error);
    return NextResponse.json({ error: "Gagal memuat data brand" }, { status: 500 });
  }
}

// 🟡 POST — tambah brand baru
export async function POST(req: Request) {
  try {
    const { nama, image, aboutId, categoryIds = [] } = await req.json();

    const brand = await prisma.brandPartner.create({
      data: {
        nama,
        image,
        aboutId,
        categories: categoryIds.length > 0 ? { connect: categoryIds.map((id: string) => ({ id })) } : undefined,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error POST brand:", error);
    return NextResponse.json({ error: "Gagal membuat brand" }, { status: 500 });
  }
}

// 🟠 PUT — update brand (harus menyertakan id di body)
export async function PUT(req: Request) {
  try {
    const { id, nama, image, aboutId, categoryIds = [] } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID brand wajib disertakan" }, { status: 400 });
    }

    const brand = await prisma.brandPartner.update({
      where: { id },
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

// 🔴 DELETE — hapus brand (via body JSON { id } atau query ?id=)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryId = searchParams.get("id");
    const body = queryId ? null : await req.json();
    const id = queryId || body?.id;

    if (!id) {
      return NextResponse.json({ error: "ID brand wajib disertakan" }, { status: 400 });
    }

    await prisma.brandPartner.delete({ where: { id } });
    return NextResponse.json({ message: "Brand berhasil dihapus" });
  } catch (error) {
    console.error("Error DELETE brand:", error);
    return NextResponse.json({ error: "Gagal menghapus brand" }, { status: 500 });
  }
}
