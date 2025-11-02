"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImage {
  id: string;
  imageUrl: string;
  urutan: number;
}

interface Product {
  nama: string;
  images: ProductImage[];
}

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const validImages = product.images && product.images.length > 0 ? product.images.filter((img) => img.imageUrl && img.imageUrl.trim() !== "").map((img) => img.imageUrl) : [];

  const images = validImages.length > 0 ? validImages : ["/placeholder.png"];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Gambar Utama */}
        <div className="relative w-full aspect-[1/1] max-h-[450px] bg-white flex items-center justify-center rounded-lg shadow-xl overflow-hidden cursor-zoom-in group" onClick={() => setIsZoomed(true)}>
          <Image src={selectedImage || "/placeholder.png"} alt={product.nama} fill className="object-contain transition-all duration-300" priority />
          {/* Overlay efek hover */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/30 transition-all duration-300" />
        </div>

        {/* Thumbnail di bawah */}
        <div className="flex gap-2 justify-center overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition ${selectedImage === img ? "border-red-500" : "border-gray-300"}`}
            >
              <Image src={img || "/placeholder.png"} alt={`${product.nama} - ${idx + 1}`} fill className="object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* Modal Zoom */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsZoomed(false)}>
            <motion.div
              className="relative w-[90vw] md:w-[70vw] lg:w-[50vw] aspect-[1/1] bg-white rounded-lg overflow-hidden shadow-2xl cursor-zoom-out"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={selectedImage} alt={product.nama} fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
