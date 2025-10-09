'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { brand } from "@/data/brands";

export default function BrandPartner({}) {
  return (
    <section className="bg-white min-h-[60vh] flex flex-col items-center justify-center p-12">
      <div className="container mx-auto text-center">
        {/* Title Section */}
        <motion.h2 className="text-2xl md:text-4xl font-semibold mb-12" initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false }}>
          ✨ Brand Partner Kami ✨
        </motion.h2>
        <motion.h2 className="text-lg md:text-xl mb-12" initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, natus corporis. Autem, molestias laudantium. Rerum molestias perspiciatis quas rem voluptas!
        </motion.h2>

        {/* Grid Logo Section */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center md:mx-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false }}
        >
          {brand.map((brands) => (
            <div key={brands.id} className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center p-4 transition duration-200 w-full h-24">
              <Image src={brands.imageUrl} alt={brands.name} width={140} height={70} className="object-contain max-h-14" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
