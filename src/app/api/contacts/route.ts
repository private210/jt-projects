import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const contact = await prisma.contact.findFirst();
    return NextResponse.json(contact || {});
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json({ error: "Gagal memuat kontak" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    const updated = await prisma.contact.upsert({
      where: { id: "contact_id_tetap" },
      update: {
        email: data.email ?? "",
        nomor_wa: data.whatsappNumber ?? "",
        alamat: data.address ?? "",
        maps_link: data.mapsLink ?? "",
        jam_operasional: data.operationalHours ?? "",
        instagram: data.instagram ?? "",
        tiktok: data.tiktok ?? "",
        facebook: data.facebook ?? "",
        youtube: data.youtube ?? "",
        whatsapp: data.whatsapp ?? "", // ✅ simpan link WhatsApp
      },
      create: {
        id: "contact_id_tetap", // Pastikan tetap satu record
        email: data.email ?? "",
        nomor_wa: data.whatsappNumber ?? "",
        alamat: data.address ?? "",
        maps_link: data.mapsLink ?? "",
        jam_operasional: data.operationalHours ?? "",
        instagram: data.instagram ?? "",
        tiktok: data.tiktok ?? "",
        facebook: data.facebook ?? "",
        youtube: data.youtube ?? "",
        whatsapp: data.whatsapp ?? "",
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ success: false, error: "Gagal memperbarui kontak" }, { status: 500 });
  }
}
