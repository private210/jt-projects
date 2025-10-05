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
            <h1 className="text-2xl lg:text-6xl font-bold leading-tight">
              Tentang &nbsp;
              <span className="text-joyo-red">Joyo Tech ID</span>
            </h1>
            <p className="text-xl text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, sint dolorum ab doloremque explicabo laboriosam ex magni eaque vitae quos, vel illo, commodi earum! Modi libero eveniet iusto a molestias voluptas commodi, velit,
              in illum fuga culpa consequuntur voluptates quos ut ratione asperiores enim quod nesciunt necessitatibus maxime unde quis impedit quaerat voluptatibus. Quaerat, molestiae. Officia culpa quae eligendi distinctio.
            </p>
          </motion.div>

          {/* === Image Content === */}
          <motion.div
            className="flex justify-center bg-joyo-red/60 p-8 my-8 lg:p-12 rounded-lg shadow-lg md:mx-18 mx-8 col-span-1"
            initial={{ x: 100, opacity: 0 }} // mulai dari kanan
            whileInView={{ x: 0, opacity: 1 }} // geser masuk ke tengah
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false }} // animasi hanya sekali
          >
            <span className="-skew-y-3 bg-joyo-white rounded-lg p-8 shadow-lg text-left w-full">
              <div className="mx-4 flex flex-col gap-4 text-sm ">
                <span className="text-joyo-black">
                  <h1 className="font-bold leading-tight mb-4 text-4xl">Visi</h1>
                  <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla obcaecati magnam hic minus vero enim unde cupiditate voluptates illum deleniti!</p>
                </span>
                <ul className="text-joyo-black list-decimal">
                  <h1 className="font-bold leading-tight my-4 text-4xl">Misi</h1>
                  <li className=""> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                  <li className=""> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                  <li className=""> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                  <li className=""> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                </ul>
              </div>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
