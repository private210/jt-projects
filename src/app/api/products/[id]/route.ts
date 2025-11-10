import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ProductOptionInput {
  warna: string;
  variant: string;
  hargaAsli: string | number;
  hargaJual: string | number;
  stock: string | number;
  images?: string[];
  specs?: {
    deskripsi_spec: string;
    image?: string | null;
  }[];
}

interface ProductUpdateInput {
  nama: string;
  deskripsi: string;
  isFavorite?: boolean;
  categoryIds?: string[];
  images?: string[];
  options?: ProductOptionInput[];
}

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
    const body: ProductUpdateInput = await request.json();
    const { nama, deskripsi, isFavorite, categoryIds, images, options } = body;

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
          connect: (categoryIds ?? []).map((cid) => ({ id: cid })),
        },
        images: {
          create: (images ?? []).map((url, i) => ({
            imageUrl: url,
            urutan: i,
          })),
        },
        options: {
          create: (options ?? []).map((opt) => ({
            warna: opt.warna,
            variant: opt.variant,
            hargaAsli: Number(opt.hargaAsli),
            hargaJual: Number(opt.hargaJual),
            stock: Number(opt.stock),
            images: {
              create: (opt.images ?? []).map((url, i) => ({
                imageUrl: url,
                urutan: i,
              })),
            },
            specs: {
              create: (opt.specs ?? []).map((s) => ({
                deskripsi_spec: s.deskripsi_spec,
                image: s.image ?? null,
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
