'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandPartner() {
  const brand = [
    { id: 1, name: "samsung", imageUrl: "https://i.pinimg.com/736x/84/28/e0/8428e0a579cae254432a18bdd9a4a282.jpg" },
    { id: 2, name: "oppo", imageUrl: "https://i.pinimg.com/1200x/79/84/3a/79843a31a008c371a8417ad73cad3ee5.jpg" },
    { id: 3, name: "xiaomi", imageUrl: "https://i.pinimg.com/1200x/b0/10/97/b010977903e191f9f9593431358c0cc8.jpg" },
    { id: 4, name: "vivo", imageUrl: "https://i.pinimg.com/736x/39/48/08/394808547e5a796b68bacce4750c39ff.jpg" },
    { id: 5, name: "realme", imageUrl: "https://i.pinimg.com/1200x/70/41/15/7041158fa345eedc223fd4056af2585f.jpg" },
    { id: 6, name: "oneplus", imageUrl: "https://i.pinimg.com/1200x/40/62/cc/4062cc7820c6161edb604295733f3fa3.jpg" },
  ];
  return (
    <section className="relative  min-h-screen items-center overflow-hidden">
      <div className="container mx-auto px-4 z-10 justify-center md:text-center py-6">
      <motion.div
        className="space-y-6 md:col-span-2 lg:col-span-1 px-12"
        initial={{ y: -100, opacity: 0 }} // mulai dari kiri
        whileInView={{ y: 0, opacity: 2 }} // masuk ke posisi normal
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }} // animasi hanya sekali
      >
        <div className="flex flex-wrap flex-col gap-4">
        <h1 className="text-4xl lg:text-7xl font-bold leading-tight">Brand Partner Kami</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ut dolorem aspernatur labore praesentium excepturi quia est, fugit nesciunt, similique quidem, quisquam repellat doloremque consequatur.</p>
        <div className="flex flex-row-reverse justify-center gap-4">
          {brand.map((brand) => (
            <Image
            key={brand.id}
              src={brand.imageUrl ?? ""}
              alt={brand.name}
              width={200}
              height={200}
            />
          ))}
        </div>
            </div>
      </motion.div>
        </div>
    </section>
  );
}
