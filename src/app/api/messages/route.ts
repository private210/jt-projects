import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // Validasi input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
    }

    // Ambil email tujuan dari database contact
    const contact = await prisma.contact.findFirst();

    if (!contact?.email) {
      return NextResponse.json({ error: "Email tujuan belum dikonfigurasi" }, { status: 500 });
    }

    // Simpan pesan ke database (opsional)
    const savedMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      },
    });

    // Konfigurasi nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Email Gmail Anda
        pass: process.env.GMAIL_APP_PASSWORD, // App Password Gmail
      },
    });

    // Template email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #4b5563; }
          .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #dc2626; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Pesan Baru dari Website</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Dari:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subjek:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Pesan:</div>
              <div class="value">${message.replace(/\n/g, "<br>")}</div>
            </div>
          </div>
          <div class="footer">
            <p>Email ini dikirim otomatis dari form kontak website Anda</p>
            <p>Waktu: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Kirim email
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.GMAIL_USER}>`,
      to: contact.email,
      replyTo: email, // Agar bisa langsung reply ke pengirim
      subject: `[Contact Form] ${subject}`,
      html: emailHTML,
    });

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Gagal mengirim pesan" }, { status: 500 });
  }
}

// GET untuk mengambil semua pesan (opsional, untuk admin dashboard)
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Gagal memuat pesan" }, { status: 500 });
  }
}
