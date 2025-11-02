import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        categories: true,
        images: {
          orderBy: { urutan: "asc" },
        },
        options: {
          include: {
            images: {
              orderBy: { urutan: "asc" },
            },
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
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Gagal memuat produk" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { nama, deskripsi, isFavorite, categoryIds, images, options } = await req.json();

    await prisma.productOption.deleteMany({ where: { productId: params.id } });
    await prisma.productImage.deleteMany({ where: { productId: params.id } });

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        nama,
        deskripsi,
        isFavorite: Boolean(isFavorite),
        categories: {
          set: [],
          connect: (categoryIds || []).map((id: string) => ({ id })),
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
        images: {
          orderBy: { urutan: "asc" },
        },
        options: {
          include: {
            images: {
              orderBy: { urutan: "asc" },
            },
            specs: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Gagal memperbarui produk" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Gagal menghapus produk" }, { status: 500 });
  }
}
