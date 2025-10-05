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
    { id: 6, name: "oneplus", imageUrl: "https://i.pinimg.com/736x/a2/b6/a7/a2b6a70b3b0679f3057e14646163d837.jpg" },
    { id: 7, name: "lenovo", imageUrl: "https://i.pinimg.com/1200x/af/27/17/af2717594a6cc5ef681189e0c4914875.jpg" },
    { id: 8, name: "apple", imageUrl: "https://i.pinimg.com/1200x/41/1c/a6/411ca68bd1b2e79d4e96d2bd29e35e53.jpg" },
    { id: 9, name: "Tecno", imageUrl: "https://i.pinimg.com/1200x/23/41/a1/2341a1d588ed8223e4af5299f06ed05d.jpg" },
    { id: 10, name: "huawei", imageUrl: "https://i.pinimg.com/736x/87/c8/5c/87c85c0321ff4eaf194afd0e8cbfbed5.jpg" },
    { id: 11, name: "poco", imageUrl: "https://i.pinimg.com/736x/87/c8/5c/87c85c0321ff4eaf194afd0e8cbfbed5.jpg" },
    { id: 12, name: "asus", imageUrl: "https://i.pinimg.com/736x/87/c8/5c/87c85c0321ff4eaf194afd0e8cbfbed5.jpg" },
    { id: 13, name: "acer", imageUrl: "https://i.pinimg.com/1200x/69/47/b9/6947b9b5bef862437e5313aa78442a1d.jpg" },
    { id: 14, name: "Iqoo", imageUrl: "https://i.pinimg.com/1200x/c8/55/03/c85503ffac45d4b8b14ba397f4b44ce9.jpg" },
    { id: 15, name: "Infinix", imageUrl: "https://i.pinimg.com/736x/a2/b6/a7/a2b6a70b3b0679f3057e14646163d837.jpg" },
    { id: 16, name: "HP", imageUrl: "https://i.pinimg.com/736x/1e/8f/bf/1e8fbf6cefadd0ba671713ff1710ec3e.jpg" },
  ];
  return (
    <section className="p-20 bg-white min-h-[60vh] flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        {/* Title Section */}
        <motion.h2 className="text-3xl md:text-4xl font-semibold mb-12" initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false }}>
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
          {brand.map((brand) => (
            <div key={brand.id} className="bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center p-4 transition duration-200 w-full h-24">
              <Image src={brand.imageUrl} alt={brand.name} width={140} height={70} className="object-contain max-h-14" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
