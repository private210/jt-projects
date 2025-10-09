"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
export default function CTASection() {
  return (
    <section className="py-20 bg-gray-100">
      <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-lg text-gray-700 mb-8">Jika Anda memiliki pertanyaan, saran, atau masukan, silakan datang ke toko kami di Ponorogo atau hubungi kami melalui kontak di bawah ini.</p>
            <div className="flex flex-wrap justify-center gap-4 ml-6">
              <div className="text-center">
                <Button className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-joyo-red/50 hover:text-joyo-white mt-4">
                  <MapPin className="w-8 h-8" />
                  <Link href="https://goo.gl/maps/1GKQ7Y5o9L2wVYjQ9" target="_blank" rel="noopener noreferrer">
                    Lihat Lokasi
                  </Link>
                </Button>
              </div>
                <Button className="bg-red-600/50 text-white px-4 py-2 rounded font-semibold hover:bg-joyo-red hover:text-joyo-white mt-4">
                  <Phone className="w-8 h-8" />
                  <Link href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
                    Kontak Kami
                  </Link>
                </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
