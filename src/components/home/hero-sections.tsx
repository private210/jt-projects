"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Beams from "@/components/Beams";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-joyo-black text-joyo-white min-h-screen flex items-center overflow-hidden">
      {/* Background Beams */}
      <div className="absolute inset-0 z-0">
        <Beams beamWidth={2.6} beamHeight={30} beamNumber={30} lightColor="#e63946" speed={4} noiseIntensity={0} scale={0.2} rotation={312} />
      </div>
      <div className="absolute inset-0" />
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-12 items-center justify-center md:text-left">
          {/* === Text Content === */}
          <motion.div
            className="space-y-6 md:col-span-2 lg:col-span-1 px-12"
            initial={{ x: -100, opacity: 0 }} // mulai dari kiri
            whileInView={{ x: 0, opacity: 1 }} // masuk ke posisi normal
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }} // animasi hanya sekali
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Solusi Teknologi
              <span className="text-joyo-red block">Terlengkap</span>
            </h1>
            <p className="text-xl text-gray-300">Joyo Tech ID menyediakan berbagai produk elektronik dan jasa teknologi berkualitas dengan harga terbaik di Ponorogo.</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-joyo-red hover:bg-joyo-red/60 hover:text-white">
                Lihat Produk
              </Button>
              <Button size="lg" variant="outline" className="text-joyo-white border-joyo-white">
                Konsultasi Gratis
              </Button>
            </div>
          </motion.div>

          {/* === Image Content === */}
          <motion.div
            className="hidden lg:flex justify-center bg-joyo-red/60 p-8 lg:p-12 rounded-lg shadow-lg mx-18"
            initial={{ x: 100, opacity: 0 }} // mulai dari kanan
            whileInView={{ x: 0, opacity: 1 }} // geser masuk ke tengah
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false }} // animasi hanya sekali
          >
            <span className="-skew-y-3 bg-joyo-white rounded-lg p-8 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1713277228873-f42caef40b17?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Joyo Tech ID"
                className="rounded-lg shadow-2xl"
                width={500}
                height={100}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
