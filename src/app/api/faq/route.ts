import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all FAQs (only active for public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    const faqs = await prisma.fAQ.findMany({
      where: showAll ? {} : { isActive: true },
      orderBy: { urutan: "asc" },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

// POST - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pertanyaan, jawaban, urutan, isActive } = body;

    if (!pertanyaan || !jawaban) {
      return NextResponse.json({ error: "Pertanyaan dan jawaban wajib diisi" }, { status: 400 });
    }

    const faq = await prisma.fAQ.create({
      data: {
        pertanyaan,
        jawaban,
        urutan: urutan || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}

// PUT - Update FAQ
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, pertanyaan, jawaban, urutan, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID FAQ diperlukan" }, { status: 400 });
    }

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        pertanyaan,
        jawaban,
        urutan,
        isActive,
      },
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

// DELETE - Delete FAQ
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID FAQ diperlukan" }, { status: 400 });
    }

    await prisma.fAQ.delete({
      where: { id },
    });

    return NextResponse.json({ message: "FAQ berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
