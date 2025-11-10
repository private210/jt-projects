import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🧩 Tipe data input yang dikirim dari frontend
interface ProductSpecInput {
  deskripsi_spec: string;
  image?: string | null;
}

interface ProductOptionInput {
  warna: string;
  variant: string;
  hargaAsli: string | number;
  hargaJual: string | number;
  stock: string | number;
  images?: string[];
  specs?: ProductSpecInput[];
}

interface ProductCreateInput {
  nama: string;
  deskripsi: string;
  isFavorite?: boolean;
  categoryIds?: string[];
  images?: string[];
  options?: ProductOptionInput[];
}

// ✅ GET /api/products
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
    console.error("❌ Error fetching products:", error);
    return NextResponse.json({ error: "Gagal memuat produk" }, { status: 500 });
  }
}

// ✅ POST /api/products
export async function POST(req: Request) {
  try {
    const body: ProductCreateInput = await req.json();
    const { nama, deskripsi, isFavorite, categoryIds, images, options } = body;

    const product = await prisma.product.create({
      data: {
        nama,
        deskripsi,
        isFavorite: Boolean(isFavorite),
        categories: {
          connect: (categoryIds ?? []).map((id) => ({ id })),
        },
        ...(images?.length
          ? {
              images: {
                create: images.map((url, i) => ({
                  imageUrl: url,
                  urutan: i,
                })),
              },
            }
          : {}),
        ...(options?.length
          ? {
              options: {
                create: options.map((opt) => ({
                  warna: opt.warna,
                  variant: opt.variant,
                  hargaAsli: Number(opt.hargaAsli),
                  hargaJual: Number(opt.hargaJual),
                  stock: Number(opt.stock),
                  ...(opt.images?.length
                    ? {
                        images: {
                          create: opt.images.map((url, i) => ({
                            imageUrl: url,
                            urutan: i,
                          })),
                        },
                      }
                    : {}),
                  ...(opt.specs?.length
                    ? {
                        specs: {
                          create: opt.specs.map((s) => ({
                            deskripsi_spec: s.deskripsi_spec,
                            image: s.image ?? null,
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
    console.error("❌ Error creating product:", error);
    return NextResponse.json({ error: "Gagal menambah produk" }, { status: 500 });
  }
}
