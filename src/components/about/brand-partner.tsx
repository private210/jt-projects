"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BrandPartner {
  id: string;
  nama: string;
  image: string | null;
}

export default function BrandPartnerSection() {
  const [brands, setBrands] = useState<BrandPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands"); // ✅ ganti endpoint
        if (!response.ok) throw new Error("Gagal memuat data brand");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brand partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="bg-white py-12 flex flex-col items-center px-12">
      <div className="container mx-auto text-center">
        {/* Title */}
        <motion.h2 className="text-2xl md:text-4xl font-semibold mb-4" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          ✨ Brand Partner ✨
        </motion.h2>

        <p className="text-gray-600 mb-10">Kami bekerja sama dengan brand-brand terpercaya untuk memberikan produk terbaik kepada Anda.</p>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
          </div>
        ) : brands.length > 0 ? (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            {brands.map((brand) => (
              <div key={brand.id} className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center p-4 transition duration-200 w-full h-24">
                {brand.image ? <Image src={brand.image} alt={brand.nama} width={140} height={70} className="object-contain max-h-14" /> : <span className="text-gray-400 text-sm">{brand.nama}</span>}
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">Belum ada brand partner</p>
        )}
      </div>
    </section>
  );
}
