import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch about data
export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      include: {
        brandPartner: true,
        contact: true,
      },
    });

    if (!about) {
      return NextResponse.json(null);
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 });
  }
}

// PUT - Update about data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, deskripsi, image, visi, misi, layanan } = body;

    // Check if about exists
    const existingAbout = await prisma.about.findFirst();

    let about;
    if (existingAbout) {
      // Update existing
      about = await prisma.about.update({
        where: { id: existingAbout.id },
        data: {
          title,
          deskripsi,
          image,
          visi,
          misi,
          layanan,
        },
        include: {
          brandPartner: true,
          contact: true,
        },
      });
    } else {
      // Create new if not exists
      about = await prisma.about.create({
        data: {
          title,
          deskripsi,
          image,
          visi,
          misi,
          layanan,
        },
        include: {
          brandPartner: true,
          contact: true,
        },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json({ error: "Failed to update about data" }, { status: 500 });
  }
}
