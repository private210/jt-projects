import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET /api/products/[id]
export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        images: { orderBy: { urutan: "asc" } },
        options: {
          include: {
            images: { orderBy: { urutan: "asc" } },
            specs: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Error GET /products/[id]:", error);
    return NextResponse.json({ error: "Gagal memuat produk" }, { status: 500 });
  }
}

// ✅ PUT /api/products/[id]
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const { nama, deskripsi, isFavorite, categoryIds, images, options } = await request.json();

    // Hapus relasi lama sebelum update ulang
    await prisma.productOption.deleteMany({ where: { productId: id } });
    await prisma.productImage.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        nama,
        deskripsi,
        isFavorite: Boolean(isFavorite),
        categories: {
          set: [],
          connect: (categoryIds || []).map((cid: string) => ({ id: cid })),
        },
        images: {
          create: (images || []).map((url: string, i: number) => ({
            imageUrl: url,
            urutan: i,
          })),
        },
        options: {
          create: (options || []).map((opt: any) => ({
            warna: opt.warna,
            variant: opt.variant,
            hargaAsli: parseFloat(opt.hargaAsli),
            hargaJual: parseFloat(opt.hargaJual),
            stock: parseInt(opt.stock),
            images: {
              create: (opt.images || []).map((url: string, i: number) => ({
                imageUrl: url,
                urutan: i,
              })),
            },
            specs: {
              create: (opt.specs || []).map((s: any) => ({
                deskripsi_spec: s.deskripsi_spec,
                image: s.image || null,
              })),
            },
          })),
        },
      },
      include: {
        categories: true,
        images: { orderBy: { urutan: "asc" } },
        options: {
          include: {
            images: { orderBy: { urutan: "asc" } },
            specs: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Error PUT /products/[id]:", error);
    return NextResponse.json({ error: "Gagal memperbarui produk" }, { status: 500 });
  }
}

// ✅ DELETE /api/products/[id]
export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error DELETE /products/[id]:", error);
    return NextResponse.json({ error: "Gagal menghapus produk" }, { status: 500 });
  }
}
