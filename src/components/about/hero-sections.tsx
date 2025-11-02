"use client";

import { useEffect, useState } from "react";
import Beams from "@/components/Beams";
import { motion } from "framer-motion";
import RotatingText from "@/components/RotatingText";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";

interface AboutData {
  title: string;
  deskripsi: string;
  image: string | null;
  visi: string;
  misi: string;
  layanan: string;
}

interface SiteSetting {
  logo: string | null;
  nama_company: string;
}

export default function HeroSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [siteSetting, setSiteSetting] = useState<SiteSetting | null>(null);
  const [services, setServices] = useState<string[]>([]);

  // Ambil data about dan site setting
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Ambil data secara paralel
      const [aboutRes, siteRes] = await Promise.all([fetch("/api/about"), fetch("/api/site-settings")]);

      const aboutJson = await aboutRes.json();
      const siteJson = await siteRes.json();

      if (aboutJson) {
        setAboutData(aboutJson);

        // Parsing layanan
        try {
          const parsedServices = JSON.parse(aboutJson.layanan);
          setServices(Array.isArray(parsedServices) ? parsedServices : [aboutJson.layanan]);
        } catch {
          const serviceList = aboutJson.layanan
            .split(/[,\n]/)
            .map((s: string) => s.trim())
            .filter(Boolean);
          setServices(serviceList.length > 0 ? serviceList : ["COD & FREE ONGKIR"]);
        }
      }

      if (siteJson) setSiteSetting(siteJson);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Parsing misi menjadi list
  const missionList = aboutData?.misi.split("\n").filter(Boolean) || [];

  // Default logo dan nama jika belum diatur
  const logoUrl = siteSetting?.logo || "/assets/logo.JPG";
  const companyName = siteSetting?.nama_company || "Joyo Tech ID";

  return (
    <section className="relative bg-joyo-black text-joyo-white min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {aboutData?.image ? (
          <div className="absolute inset-0">
            <Image
              src={aboutData.image}
              alt="Background Image"
              fill
              priority
              className="object-cover blur-md scale-105" // 🔹 efek blur + sedikit zoom agar tidak terlihat tepi blur
            />
            {/* Lapisan overlay agar teks tetap terbaca */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : (
          // 🔹 Fallback background dengan gradient + blur halus
          <div className="absolute inset-0 bg-gradient-to-b from-joyo-black/80 to-joyo-red/40 backdrop-blur-md" />
        )}
      </div>

      {/* Konten */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-20">
          {/* === Bagian Kiri (Logo + Text) === */}
          <motion.div className="space-y-6 text-center md:text-left" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            {/* Logo Perusahaan */}
            <div className="flex justify-center md:justify-start">
              <Image src={logoUrl} alt="Logo Perusahaan" width={120} height={120} className="rounded-lg object-contain" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {aboutData?.title || "Tentang"} <span className="text-joyo-red">{companyName}</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">{aboutData?.deskripsi || "Joyo Tech ID menyediakan solusi teknologi lengkap untuk kebutuhan bisnis dan personal Anda."}</p>

            {/* Layanan */}
            {services.length > 0 && (
              <div className="flex items-center gap-6 px-4 py-3 rounded-xl border border-white/20 shadow-lg w-fit bg-white/10 backdrop-blur-md mx-auto md:mx-0">
                <span className="text-joyo-white text-sm md:text-lg font-medium whitespace-nowrap">Layanan:</span>
                <div className="bg-joyo-red flex items-center gap-2 rounded-lg p-2">
                  <RotatingText
                    texts={services}
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
            )}
          </motion.div>

          {/* === Bagian Kanan (Visi & Misi) === */}
          <motion.div className="flex justify-center bg-joyo-red/60 p-8 rounded-lg shadow-lg" initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
            <div className="bg-joyo-white rounded-lg p-6 md:p-8 shadow-lg text-left w-full -skew-1">
              <h1 className="font-bold mb-4 text-2xl md:text-3xl text-joyo-black">Visi</h1>
              <p className="text-gray-700 mb-6">{aboutData?.visi}</p>

              <h1 className="font-bold mb-4 text-2xl md:text-3xl text-joyo-black">Misi</h1>
              <ul className="list-decimal list-inside space-y-2 text-gray-700">
                {missionList.map((mission, index) => (
                  <li key={index}>{mission}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
