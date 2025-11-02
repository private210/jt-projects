import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
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
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Gagal memuat produk" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nama, deskripsi, isFavorite, categoryIds, images, options } = await req.json();

    const product = await prisma.product.create({
      data: {
        nama,
        deskripsi,
        isFavorite: Boolean(isFavorite),
        categories: {
          connect: (categoryIds || []).map((id: string) => ({ id })),
        },
        ...(images?.length
          ? {
              images: {
                create: images.map((url: string, i: number) => ({
                  imageUrl: url,
                  urutan: i,
                })),
              },
            }
          : {}),
        ...(options?.length
          ? {
              options: {
                create: options.map((opt: any) => ({
                  warna: opt.warna,
                  variant: opt.variant,
                  hargaAsli: parseFloat(opt.hargaAsli),
                  hargaJual: parseFloat(opt.hargaJual),
                  stock: parseInt(opt.stock),
                  ...(opt.images?.length
                    ? {
                        images: {
                          create: opt.images.map((url: string, i: number) => ({
                            imageUrl: url,
                            urutan: i,
                          })),
                        },
                      }
                    : {}),
                  ...(opt.specs?.length
                    ? {
                        specs: {
                          create: opt.specs.map((s: any) => ({
                            deskripsi_spec: s.deskripsi_spec,
                            image: s.image || null,
                          })),
                        },
                      }
                    : {}),
                })),
              },
            }
          : {}),
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
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Gagal menambah produk" }, { status: 500 });
  }
}
