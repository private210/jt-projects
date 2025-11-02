"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Beams from "@/components/Beams";
import { motion } from "framer-motion";
import Link from "next/link";

interface HomeData {
  title: string;
  deskripsi: string;
  image: string | null;
}

interface ContactData {
  nomor_wa?: string | null;
  whatsapp?: string | null;
}

export default function HeroSection() {
  // 🎯 Default content langsung tampil instan
  const [homeData, setHomeData] = useState<HomeData>({
    title: "Solusi Teknologi Terlengkap",
    deskripsi: "Joyo Tech ID menyediakan berbagai produk elektronik dan jasa teknologi berkualitas dengan harga terbaik di Ponorogo.",
    image: null,
  });

  const [contact, setContact] = useState<ContactData | null>(null);

  // 🔹 Fetch home data (background update tanpa loading state)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/home", { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal memuat data home");
        const data = await res.json();
        if (data?.title) setHomeData(data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    })();
  }, []);

  // 🔹 Fetch WhatsApp contact
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/contacts", { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal memuat kontak");
        const data = await res.json();
        setContact(data);
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    })();
  }, []);

  // 🔹 Buat link WhatsApp otomatis dari DB
  const whatsappNumber = contact?.nomor_wa || "6281234567890";
  const whatsappLink = contact?.whatsapp || `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo! Saya tertarik ingin konsultasi dengan Joyo Tech ID")}`;

  return (
    <section className="relative bg-joyo-black text-joyo-white min-h-screen flex items-center overflow-hidden">
      {/* Background Beams */}
      <div className="absolute inset-0 z-0">
        <Beams beamWidth={2.6} beamHeight={30} beamNumber={30} lightColor="#e63946" speed={4} noiseIntensity={0} scale={0.2} rotation={312} />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-12 items-center justify-center md:text-left">
          {/* === Text Content === */}
          <motion.div className="space-y-6 md:col-span-2 lg:col-span-1 px-12" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              {homeData.title.split(" ").slice(0, 2).join(" ")}
              <span className="text-joyo-red block">{homeData.title.split(" ").slice(2).join(" ")}</span>
            </h1>
            <p className="text-xl text-gray-300">{homeData.deskripsi}</p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-joyo-red hover:bg-joyo-red/60 hover:text-white">
                <Link href="/products" className="flex items-center gap-2">
                  Lihat Produk
                </Link>
              </Button>

              <Button variant="outline" className="text-joyo-black hover:bg-joyo-white bg-joyo-white/80">
                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Konsultasi Gratis
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* === Image Content === */}
          <motion.div
            className="hidden lg:flex justify-center bg-joyo-red/60 p-4 lg:p-8 rounded-lg shadow-lg mx-18"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false }}
          >
            <span className="bg-joyo-white rounded-lg p-2 shadow-lg">
              <Image src={homeData.image || "/placeholder.png"} alt="Joyo Tech ID" className="rounded-lg shadow-2xl" width={500} height={300} />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
