'use client';

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { banners } from "@/data/banner";
import { motion } from "framer-motion";

export default function BannersSections() {
  return (
   <section className="w-full mx-auto p-10 my-20 md:my-10">
    <motion.div
        initial={{ y: -100, opacity: 0 }} // mulai dari kiri
        whileInView={{ y: 0, opacity: 1 }} // masuk ke posisi normal
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }} // animasi hanya sekali
      >
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
              <div className="relative w-full min-h-[300px] rounded-xl overflow-hidden md:min-h-[600px]">
                <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                  <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2">{banner.title}</h2>
                  <p className="max-w-xl text-sm sm:text-base md:text-lg lg:text-xl">{banner.description}</p>
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
