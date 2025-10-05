'use client';

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

export default function BannersSections() {
  const banners = [
    {
      id: 1,
      imageUrl: "https://i.pinimg.com/1200x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg",
      title: "Promo Spesial Bulan Ini",
      description: "Dapatkan diskon hingga 50% untuk produk pilihan selama bulan ini.",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
      title: "Layanan Konsultasi Gratis",
      description: "Hubungi kami untuk mendapatkan konsultasi gratis mengenai kebutuhan teknologi Anda.",
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1470&auto=format&fit=crop",
      title: "Produk Terbaru Telah Tersedia",
      description: "Jelajahi koleksi produk terbaru kami yang baru saja diluncurkan.",
    },
  ];

  return (
    <section className="w-full mx-auto p-10 my-8">
      <Carousel
        plugins={[
          Autoplay({
            delay: 6000, // 3 detik
            stopOnInteraction: false, // berhenti kalau user swipe manual
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative">
                <Image src={banner.imageUrl} alt={banner.title} width={1200} height={500} className="object-cover w-full h-[600px] rounded-xl" />

                {/* Overlay untuk teks dan tombol */}
                <div className="absolute inset-0 rounded-xl flex flex-col justify-center items-center text-center text-white">
                {/* <div className="absolute inset-0 bg-black/40 rounded-xl flex flex-col justify-center items-center text-center text-white"> // overlay hitam transparan
                   <h2 className="text-2xl font-bold mb-2">{banner.title}</h2> //teks isi sendiri di tengah content
                  <p className="max-w-xl">{banner.description}</p> */}
                  
                  {/* Tombol swipe ditempatkan di dalam konten */}
                  <div className="absolute  left-0 flex items-center">
                    <CarouselPrevious className="relative left-4 bg-white/30 hover:bg-white/50 text-joyo-white/25" />
                  </div>
                  <div className="absolute right-0 flex items-center">
                    <CarouselNext className="relative right-4 bg-white/30 hover:bg-white/50 text-joyo-white/25" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
