"use client";

import Beams from "@/components/Beams";
import { motion } from "framer-motion";
import RotatingText from "@/components/RotatingText";
import { CircleCheckBig } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-joyo-black text-joyo-white min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Beams beamWidth={2.6} beamHeight={30} beamNumber={30} lightColor="#e63946" speed={4} noiseIntensity={0} scale={0.2} rotation={312} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 md:px-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-30">
          {/* === Text Content === */}
          <motion.div className="space-y-6" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Tentang <span className="text-joyo-red">Joyo Tech ID</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, sint dolorum ab doloremque explicabo laboriosam ex magni eaque vitae quos, vel illo, commodi earum! Modi libero eveniet iusto a molestias voluptas commodi, velit,
              in illum fuga culpa consequuntur voluptates quos ut ratione asperiores enim quod nesciunt necessitatibus maxime unde quis impedit quaerat voluptatibus. Quaerat, molestiae. Officia culpa quae eligendi distinctio.
            </p>

            {/* Layanan */}
            <div className="flex items-center gap-6 px-4 py-3 rounded-xl border border-white/20 shadow-lg w-fit bg-white/10 backdrop-blur-md">
              <span className="text-joyo-white text-sm md:text-lg font-medium whitespace-nowrap">Layanan:</span>
              <div className="bg-joyo-red flex items-center gap-2 rounded-lg p-2">
                <RotatingText
                  texts={["COD & FREE ONGKIR", "TRANSFER & QRIS", "TUKAR TAMBAH", "KREDIT"]}
                  mainClassName="px-3 py-1 font-bold text-xs md:text-base rounded-lg min-w-[120px] text-center"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
                <CircleCheckBig className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </motion.div>

          {/* === Image Content (Visi Misi) === */}
          <motion.div className="flex justify-center bg-joyo-red/60 p-6 md:p-10 rounded-lg shadow-lg" initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
            <div className="bg-joyo-white rounded-lg p-6 md:p-8 shadow-lg text-left w-full max-w-md">
              <h1 className="font-bold mb-4 text-2xl md:text-3xl text-joyo-black">Visi</h1>
              <p className="text-gray-700 mb-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla obcaecati magnam hic minus vero enim unde cupiditate voluptates illum deleniti!</p>

              <h1 className="font-bold mb-4 text-2xl md:text-3xl text-joyo-black">Misi</h1>
              <ul className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
