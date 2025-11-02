// app/api/categories/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all categories with brand partners
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        brandPartners: {
          select: {
            id: true,
            nama: true,
            image: true,
          },
        },
        products: {
          select: {
            id: true,
          },
        },
      },
      orderBy: { nama: "asc" },
    });

    // Transform data to include brands array for easier use
    const transformedCategories = categories.map((cat) => ({
      ...cat,
      brands: cat.brandPartners,
      productCount: cat.products.length,
    }));

    return NextResponse.json(transformedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Gagal memuat kategori" }, { status: 500 });
  }
}

// POST - Create new category
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, brandPartnerIds } = body;

    // Validate required fields
    if (!nama || !nama.trim()) {
      return NextResponse.json({ error: "Nama kategori harus diisi" }, { status: 400 });
    }

    // Check if category name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        nama: {
          equals: nama.trim(),
          mode: "insensitive",
        },
      },
    });

    if (existingCategory) {
      return NextResponse.json({ error: "Kategori dengan nama ini sudah ada" }, { status: 400 });
    }

    // Create category with brand partners
    const category = await prisma.category.create({
      data: {
        nama: nama.trim(),
        ...(brandPartnerIds && brandPartnerIds.length > 0
          ? {
              brandPartners: {
                connect: brandPartnerIds.map((id: string) => ({ id })),
              },
            }
          : {}),
      },
      include: {
        brandPartners: {
          select: {
            id: true,
            nama: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      ...category,
      brands: category.brandPartners,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Gagal membuat kategori" }, { status: 500 });
  }
}

// PUT - Update category
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama, brandPartnerIds } = body;

    if (!id) {
      return NextResponse.json({ error: "ID kategori harus ada" }, { status: 400 });
    }

    if (!nama || !nama.trim()) {
      return NextResponse.json({ error: "Nama kategori harus diisi" }, { status: 400 });
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
    }

    // Check if name is taken by another category
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        nama: {
          equals: nama.trim(),
          mode: "insensitive",
        },
        NOT: {
          id: id,
        },
      },
    });

    if (duplicateCategory) {
      return NextResponse.json({ error: "Kategori dengan nama ini sudah ada" }, { status: 400 });
    }

    // Update category
    const category = await prisma.category.update({
      where: { id },
      data: {
        nama: nama.trim(),
        brandPartners: {
          set: [], // Clear existing relations
          ...(brandPartnerIds && brandPartnerIds.length > 0
            ? {
                connect: brandPartnerIds.map((id: string) => ({ id })),
              }
            : {}),
        },
      },
      include: {
        brandPartners: {
          select: {
            id: true,
            nama: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      ...category,
      brands: category.brandPartners,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Gagal memperbarui kategori" }, { status: 500 });
  }
}

// DELETE - Delete category
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID kategori harus ada" }, { status: 400 });
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          select: { id: true },
        },
      },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
    }

    // Check if category is being used by products
    if (existingCategory.products.length > 0) {
      return NextResponse.json({ error: `Kategori tidak dapat dihapus karena masih digunakan oleh ${existingCategory.products.length} produk` }, { status: 400 });
    }

    // Delete category
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Gagal menghapus kategori" }, { status: 500 });
  }
}
