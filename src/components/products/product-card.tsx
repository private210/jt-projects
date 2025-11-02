"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { formatCurrency, getTotalStock } from "@/lib/utils";

interface ProductImage {
  id: string;
  imageUrl: string;
  urutan: number;
}

interface ProductOption {
  id: string;
  hargaAsli: number;
  hargaJual: number;
  stock: number;
}

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  images: ProductImage[];
  options: ProductOption[];
  isFavorite: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const totalStock = getTotalStock(product);
  const stockAvailable = totalStock > 0;
  const stockText = stockAvailable ? "Tersedia" : "Habis";
  const stockClasses = stockAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  // Ambil gambar pertama yang valid dari product images
  const validImages = product.images?.filter((img) => img.imageUrl && img.imageUrl.trim() !== "") || [];
  const firstImage = validImages.length > 0 ? validImages[0].imageUrl : "/placeholder.png";

  // Ambil harga dari option pertama (atau harga terendah)
  const option = product.options?.[0];
  const hargaJual = option?.hargaJual ?? 0;
  const hargaAsli = option?.hargaAsli ?? 0;

  // Truncate description to 5-10 words
  const truncateDescription = (text: string, maxWords: number = 8): string => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const shortDescription = truncateDescription(product.deskripsi);

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
      <div className="w-full bg-white rounded-md shadow-sm h-full flex flex-col border overflow-hidden hover:shadow-lg transition-shadow">
        {/* Gambar produk */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-100">
          {firstImage && firstImage !== "/placeholder.png" ? (
            <Image
              src={firstImage}
              alt={product.nama}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={(e) => {
                // Fallback jika gambar gagal load
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.png";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {!stockAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Habis</span>
            </div>
          )}
        </div>

        {/* Detail Produk */}
        <div className="px-3 py-4 flex flex-col flex-grow">
          {/* Judul Produk */}
          <Link href={`/products/${product.id}`}>
            <h5 className="text-sm font-semibold line-clamp-2 hover:text-red-600 transition-colors">{product.nama}</h5>
          </Link>

          {/* Deskripsi Singkat */}
          {shortDescription && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{shortDescription}</p>}

          <div className="flex-grow" />

          {/* Harga dan Stok - Dalam satu baris */}
          <div className="mt-2 flex items-start justify-between gap-2">
            {/* Kolom Kiri: Harga */}
            <div className="flex flex-col">
              {hargaAsli > hargaJual && <span className="line-through text-xs text-gray-400">{formatCurrency(hargaAsli)}</span>}
              <span className="text-red-600 font-bold text-lg">{formatCurrency(hargaJual)}</span>
            </div>

            {/* Kolom Kanan: Stok */}
            <div className="flex items-center">
              <span className={`inline-block px-2 py-0.5 rounded-full font-medium text-xs ${stockClasses}`}>{stockText}</span>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex items-center justify-between mt-3">
            <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors" asChild disabled={!stockAvailable}>
              <Link href={`/products/${product.id}`} className="text-sm font-medium">
                Lihat Produk
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
