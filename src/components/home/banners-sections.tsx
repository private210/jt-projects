"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Banner {
  id: string;
  title: string;
  deskripsi: string;
  image?: string | null;
  urutan: number;
  isActive: boolean;
}

export default function BannersSections() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Ambil data dari API
  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch("/api/banners");
        if (!res.ok) throw new Error("Gagal memuat banner");

        const data: Banner[] = await res.json();

        // hanya tampilkan banner aktif
        const active = data.filter((b) => b.isActive);
        setBanners(active);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  // 🔸 Loading State
  if (loading) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading banners...</p>
      </section>
    );
  }

  // 🔸 Error State
  if (error) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-red-500 text-lg">Terjadi kesalahan: {error}</p>
      </section>
    );
  }

  // 🔸 Jika tidak ada banner aktif
  if (banners.length === 0) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Tidak ada banner aktif.</p>
      </section>
    );
  }

  // 🔹 Render Carousel
  return (
    <section className="w-full mx-auto p-4 sm:p-6 md:p-10 my-10 md:my-20">
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
        <Carousel plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]} opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative w-full min-h-[300px] md:min-h-[500px] lg:min-h-[600px] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={banner.image || "/placeholder-banner.jpg"} // fallback jika image kosong
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Overlay teks */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                    <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2">{banner.title}</h2>

                    {banner.deskripsi && <p className="max-w-xl text-sm sm:text-base md:text-lg lg:text-xl">{banner.deskripsi}</p>}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
}
