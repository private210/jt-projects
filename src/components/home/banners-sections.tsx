"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

  // 🟢 Gunakan useRef agar Autoplay tidak re-init setiap render
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch("/api/banners");
        if (!res.ok) throw new Error("Gagal memuat banner");

        const data: Banner[] = await res.json();

        // Hanya tampilkan banner aktif
        const active = data.filter((b) => b.isActive);
        // Urutkan berdasarkan urutan (jika ada)
        active.sort((a, b) => a.urutan - b.urutan);

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

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading banners...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-red-500 text-lg">Terjadi kesalahan: {error}</p>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Tidak ada banner aktif.</p>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto p-4 sm:p-6 md:p-10 my-10 md:my-20">
      <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
        <Carousel plugins={[autoplayPlugin.current]} opts={{ align: "start", loop: true }} className="w-full relative">
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative w-full min-h-[300px] md:min-h-[500px] lg:min-h-[600px] rounded-xl overflow-hidden shadow-md">
                  <Image src={banner.image || "/placeholder-banner.jpg"} alt={banner.title} fill className="object-cover" priority />

                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                    <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">{banner.title}</h2>

                    {banner.deskripsi && <p className="max-w-xl text-sm sm:text-base md:text-lg lg:text-xl">{banner.deskripsi}</p>}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Tombol Navigasi */}
          <CarouselPrevious className="left-2 sm:left-6 bg-black/30 hover:bg-black/50 text-white" />
          <CarouselNext className="right-2 sm:right-6 bg-black/30 hover:bg-black/50 text-white" />
        </Carousel>
      </motion.div>
    </section>
  );
}
