import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch site settings
export async function GET() {
  try {
    const siteSetting = await prisma.settingSite.findFirst();

    if (!siteSetting) {
      return NextResponse.json(null);
    }

    return NextResponse.json(siteSetting);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json({ error: "Failed to fetch site settings" }, { status: 500 });
  }
}

// PUT - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { logo, nama_company, metadataTitle, favicon, metakeyword, metadesc, tagline } = body;

    // Validasi input
    if (!nama_company || !metadataTitle) {
      return NextResponse.json({ error: "Nama company dan metadata title wajib diisi" }, { status: 400 });
    }

    // Check if site setting exists
    const existingSetting = await prisma.settingSite.findFirst();

    let siteSetting;
    if (existingSetting) {
      // Update existing
      siteSetting = await prisma.settingSite.update({
        where: { id: existingSetting.id },
        data: {
          logo: logo || null,
          nama_company,
          metadataTitle,
          favicon: favicon || null,
          metakeyword: metakeyword || null,
          metadesc: metadesc || null,
        },
      });
    } else {
      // Create new if not exists
      siteSetting = await prisma.settingSite.create({
        data: {
          logo: logo || null,
          nama_company,
          tagline: tagline || "",
          metadataTitle,
          favicon: favicon || null,
          metakeyword: metakeyword || null,
          metadesc: metadesc || null,
        },
      });
    }

    return NextResponse.json(siteSetting);
  } catch (error) {
    console.error("Error updating site settings:", error);
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
