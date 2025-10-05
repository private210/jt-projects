'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASections() {
  return (
    <section className="py-20 bg-gray-100">
      <motion.div
        initial={{ y: -100, opacity: 0 }} // mulai dari kiri
        whileInView={{ y: 0, opacity: 1 }} // masuk ke posisi normal
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }} // animasi hanya sekali
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Siap untuk Memulai?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Jelajahi koleksi produk teknologi kami yang inovatif dan temukan solusi terbaik untuk kebutuhan Anda. Bergabunglah dengan ribuan pelanggan puas yang telah mempercayai Joyo Tech ID sebagai mitra teknologi mereka.
            </p>
            <div className="flex flex-wrap justify-center gap-4 ml-6">
              <Button size="lg" className="bg-joyo-red hover:bg-joyo-red/60 hover:text-white">
               Jelajahi Produk Kami
              </Button>
              <Button size="lg" variant="outline" className="text-joyo-black/40 border-joyo-white">
                Konsultasikan Dengan Kami
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
