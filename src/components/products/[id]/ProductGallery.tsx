"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/data/product";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl : ["/placeholder.png"];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Gambar Utama */}
      <div className="relative w-full flex justify-center">
        <Image
          src={selectedImage}
          alt={product.name}
          width={800} // kasih width default agar Next.js bisa hitung rasio
          height={800} // kasih height default
          className="rounded-lg shadow object-cover w-auto h-auto max-h-[500px]"
          priority
        />
      </div>

      {/* Thumbnail di bawah */}
      <div className="flex gap-2 justify-center overflow-x-auto">
        {images.map((img, idx) => (
          <button key={idx} onClick={() => setSelectedImage(img)} className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${selectedImage === img ? "border-red-500" : "border-gray-300"}`}>
            <Image src={img} alt={`${product.name} - ${idx}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
