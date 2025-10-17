import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET semua brand
export async function GET() {
  try {
    const brands = await prisma.brandPartner.findMany({
      include: {
        categories: true,
        about: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(brands);
  } catch (error) {
    console.error("Error GET brands:", error);
    return NextResponse.json({ error: "Gagal memuat data brand" }, { status: 500 });
  }
}

// POST brand baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, image, aboutId, categoryIds } = body;

    const brand = await prisma.brandPartner.create({
      data: {
        nama,
        image,
        aboutId,
        categories: categoryIds && categoryIds.length ? { connect: categoryIds.map((id: string) => ({ id })) } : undefined,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Error POST brand:", error);
    return NextResponse.json({ error: "Gagal membuat brand" }, { status: 500 });
  }
}
