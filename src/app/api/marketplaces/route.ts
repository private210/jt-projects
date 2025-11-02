import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const marketplace = await prisma.marketplace.findFirst();
    return NextResponse.json(marketplace || {});
  } catch (error) {
    console.error("Error fetching marketplace:", error);
    return NextResponse.json({ error: "Gagal memuat marketplace" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    const mpData = {
      tiktokshop: data.tiktokshop?.trim() || null,
      tokopedia: data.tokopedia?.trim() || null,
      shopee: data.shopee?.trim() || null,
      updatedAt: new Date(),
    };

    const existing = await prisma.marketplace.findFirst();

    const updatedMarketplace = await prisma.marketplace.upsert({
      where: { id: existing?.id ?? "placeholder" },
      update: mpData,
      create: mpData,
    });

    return NextResponse.json({
      success: true,
      message: "Marketplace berhasil diperbarui",
      data: updatedMarketplace,
    });
  } catch (error) {
    console.error("Error updating marketplace:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memperbarui marketplace",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
