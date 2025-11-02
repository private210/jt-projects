import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch home data
export async function GET() {
  try {
    const home = await prisma.home.findFirst();

    if (!home) {
      return NextResponse.json(null);
    }

    return NextResponse.json(home);
  } catch (error) {
    console.error("Error fetching home:", error);
    return NextResponse.json({ error: "Failed to fetch home data" }, { status: 500 });
  }
}

// PUT - Update home data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, deskripsi, image } = body;

    // Validasi input
    if (!title || !deskripsi) {
      return NextResponse.json({ error: "Title dan deskripsi wajib diisi" }, { status: 400 });
    }

    // Check if home exists
    const existingHome = await prisma.home.findFirst();

    let home;
    if (existingHome) {
      // Update existing
      home = await prisma.home.update({
        where: { id: existingHome.id },
        data: {
          title,
          deskripsi,
          image: image || null,
        },
      });
    } else {
      // Create new if not exists
      home = await prisma.home.create({
        data: {
          title,
          deskripsi,
          image: image || null,
        },
      });
    }

    return NextResponse.json(home);
  } catch (error) {
    console.error("Error updating home:", error);
    return NextResponse.json({ error: "Failed to update home data" }, { status: 500 });
  }
}
