import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        brandPartners: true, // hanya relasi brand partner
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, brandPartnerIds } = body;

    const category = await prisma.category.create({
      data: {
        nama,
        brandPartners: {
          connect: brandPartnerIds?.map((id: string) => ({ id })) ?? [],
        },
      },
      include: { brandPartners: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
