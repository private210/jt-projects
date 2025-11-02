import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding database...");

  // === 1. User Admin ===
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@joyotech.com" },
    update: {},
    create: {
      name: "Administrator",
      username: "admin",
      email: "admin@joyotech.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // === 2. Home ===
  await prisma.home.upsert({
    where: { id: "home-seed" },
    update: {},
    create: {
      id: "home-seed",
      title: "Selamat Datang di JoyoTech",
      deskripsi: "Kami menyediakan produk teknologi terbaik untuk kebutuhan Anda.",
      image: "/images/home-banner.jpg",
    },
  });

  // === 3. About ===
  const about = await prisma.about.upsert({
    where: { id: "about-seed" },
    update: {},
    create: {
      id: "about-seed",
      title: "Tentang JoyoTech",
      deskripsi: "JoyoTech berdedikasi untuk menghadirkan solusi teknologi yang inovatif.",
      visi: "Menjadi pemimpin inovasi teknologi di Asia Tenggara.",
      misi: "Menyediakan produk berkualitas, layanan profesional, dan pengalaman pelanggan yang luar biasa.",
      layanan: "Penjualan Produk IT, Servis, dan Konsultasi Teknologi",
    },
  });

  // === 4. Brand Partner ===
  const brandPartner = await prisma.brandPartner.upsert({
    where: { id: "brand-seed" },
    update: {},
    create: {
      id: "brand-seed",
      nama: "TechBrand",
      image: "/images/brands/techbrand.png",
      aboutId: about.id,
    },
  });

  // === 5. Contact ===
  await prisma.contact.upsert({
    where: { id: "contact-seed" },
    update: {},
    create: {
      id: "contact-seed",
      email: "info@joyotech.com",
      nomor_wa: "6281234567890",
      alamat: "Jl. Teknologi No. 5, Jakarta",
      maps_link: "https://maps.google.com/",
      jam_operasional: "Senin - Jumat: 08.00 - 17.00",
      instagram: "https://instagram.com/joyotech",
      tiktok: "https://tiktok.com/@joyotech",
      whatsapp: "https://wa.me/6281234567890",
      facebook: "https://facebook.com/joyotech",
      youtube: "https://youtube.com/@joyotech",
      aboutId: about.id,
    },
  });

  // === 6. Category ===
  const categoryLaptop = await prisma.category.upsert({
    where: { id: "cat-laptop" },
    update: {},
    create: {
      id: "cat-laptop",
      nama: "Laptop",
    },
  });

  const categoryAksesoris = await prisma.category.upsert({
    where: { id: "cat-aksesoris" },
    update: {},
    create: {
      id: "cat-aksesoris",
      nama: "Aksesoris",
    },
  });

  // === 7. Product + Option + Spec ===
  const product = await prisma.product.upsert({
    where: { id: "prod-laptop-1" },
    update: {},
    create: {
      id: "prod-laptop-1",
      nama: "Laptop JoyoBook Pro 15",
      deskripsi: "Laptop performa tinggi dengan prosesor Intel Core i7 dan layar 15 inci Full HD.",
      categories: {
        connect: [{ id: categoryLaptop.id }],
      },
      images: {
        create: [
          { imageUrl: "/images/products/joyobook1.jpg", urutan: 1 },
          { imageUrl: "/images/products/joyobook2.jpg", urutan: 2 },
        ],
      },
      options: {
        create: [
          {
            warna: "Hitam",
            variant: "Intel i7 / 16GB / 512GB SSD",
            hargaAsli: 15000000,
            hargaJual: 13500000,
            stock: 10,
            images: {
              create: [{ imageUrl: "/images/products/joyobook1.jpg" }],
            },
            specs: {
              create: [{ deskripsi_spec: "Prosesor Intel Core i7 generasi ke-12" }, { deskripsi_spec: "RAM 16GB DDR4" }, { deskripsi_spec: "Penyimpanan SSD 512GB NVMe" }],
            },
          },
        ],
      },
    },
  });

  // === 8. Banner ===
  await prisma.banner.upsert({
    where: { id: "banner-1" },
    update: {},
    create: {
      id: "banner-1",
      title: "Promo Akhir Tahun!",
      deskripsi: "Diskon hingga 30% untuk semua produk.",
      image: "/images/banners/promo.jpg",
      urutan: 1,
      isActive: true,
    },
  });

  // === 9. FAQ ===
  await prisma.fAQ.upsert({
    where: { id: "faq-1" },
    update: {},
    create: {
      id: "faq-1",
      pertanyaan: "Bagaimana cara melakukan pemesanan?",
      jawaban: "Anda dapat memesan produk melalui halaman toko kami atau menghubungi tim sales melalui WhatsApp.",
      urutan: 1,
    },
  });

  // === 10. SettingSite ===
  await prisma.settingSite.upsert({
    where: { id: "setting-seed" },
    update: {},
    create: {
      id: "setting-seed",
      logo: "/images/logo.png",
      nama_company: "JoyoTech Indonesia",
      tagline: "Solusi Teknologi Terbaik",
      metadataTitle: "JoyoTech | Solusi Teknologi Terbaik",
      favicon: "/images/favicon.ico",
      metakeyword: "teknologi, joyotech, laptop, komputer, aksesoris",
      metadesc: "JoyoTech adalah perusahaan teknologi yang menyediakan produk dan layanan berkualitas tinggi di Indonesia.",
    },
  });

  // === 11. Marketplace ===
  await prisma.marketplace.upsert({
    where: { id: "market-seed" },
    update: {},
    create: {
      id: "market-seed",
      tiktokshop: "https://www.tiktok.com/@joyotech/shop",
      tokopedia: "https://tokopedia.com/joyotech",
      shopee: "https://shopee.co.id/joyotech",
    },
  });

  console.log("✅ Database seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
