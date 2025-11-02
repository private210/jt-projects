// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed" }, { status: 400 });
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const ext = path.extname(file.name);
    const filename = `${timestamp}-${randomStr}${ext}`;

    // Path ke folder public/upload
    const uploadDir = path.join(process.cwd(), "public", "upload");

    // Buat folder jika belum ada
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);

    // Simpan file
    await writeFile(filepath, buffer);

    // Return URL yang bisa diakses
    const url = `/upload/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
