"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Product } from "@/data/product";
import { formatCurrency, getTotalStock } from "@/lib/utils"; // ✅ import util

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const totalStock = getTotalStock(product);
  const stockAvailable = totalStock > 0;
  const stockText = stockAvailable ? `Tersedia (${totalStock})` : "Habis";
  const stockClasses = stockAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
      <div className="w-full bg-white rounded-md shadow-sm h-full flex flex-col border overflow-hidden">
        {/* ✅ Ambil foto pertama */}
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          <Image src={product.imageUrl[0]} alt={product.name} fill className={`object-cover ${!stockAvailable ? "opacity-70" : ""}`} />

          {/* 🚨 Overlay jika stok habis */}
          {!stockAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Habis</span>
            </div>
          )}
        </div>

        {/* Detail Produk */}
        <div className="px-3 py-4 flex flex-col flex-grow">
          {/* Nama Produk */}
          <Link href={`/products/${product.id}`}>
            <h5 className="text-sm font-medium line-clamp-2 min-h-[40px] hover:text-joyo-red transition-colors">{product.name}</h5>
          </Link>

          {/* Spacer otomatis */}
          <div className="flex-grow"></div>

          {/* Harga */}
          <div className="mt-1 flex flex-col">
            {product.oldPrice && <span className="line-through text-sm text-gray-400">{formatCurrency(product.oldPrice)}</span>}
            <span className="text-red-600 font-bold text-lg">{formatCurrency(product.price)}</span>
          </div>

          {/* Rating & Stok */}
          <div className="flex items-center gap-2 text-xs mt-1 text-gray-500">
            ⭐ {product.rating} | <span className={`inline-block px-2 py-0.5 rounded-full font-medium ${stockClasses}`}>{stockText}</span>
          </div>

          {/* Tombol */}
          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" className="border-joyo-red text-joyo-red hover:bg-joyo-red/10 hover:text-joyo-red" asChild disabled={!stockAvailable}>
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
