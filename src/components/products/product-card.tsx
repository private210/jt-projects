"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { formatCurrency, getTotalStock } from "@/lib/utils";

interface ProductOption {
  hargaAsli: number;
  hargaJual: number;
  stock: number;
}

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  options: ProductOption[];
  isFavorite: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const totalStock = getTotalStock(product);
  const stockAvailable = totalStock > 0;
  const stockText = stockAvailable ? `Tersedia (${totalStock})` : "Habis";
  const stockClasses = stockAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  // ambil harga dari option pertama (atau rata-rata)
  const option = product.options?.[0];
  const hargaJual = option?.hargaJual ?? 0;
  const hargaAsli = option?.hargaAsli ?? 0;

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
      <div className="w-full bg-white rounded-md shadow-sm h-full flex flex-col border overflow-hidden">
        {/* ✅ Gambar produk */}
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          {/* Belum ada gambar di schema Product — bisa tambahkan nanti */}
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">Tidak ada gambar</div>

          {!stockAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Habis</span>
            </div>
          )}
        </div>

        {/* Detail Produk */}
        <div className="px-3 py-4 flex flex-col flex-grow">
          <Link href={`/products/${product.id}`}>
            <h5 className="text-sm font-medium line-clamp-2 min-h-[40px] hover:text-red-600 transition-colors">{product.nama}</h5>
          </Link>

          <div className="flex-grow" />

          {/* Harga */}
          <div className="mt-1 flex flex-col">
            {hargaAsli > hargaJual && <span className="line-through text-sm text-gray-400">{formatCurrency(hargaAsli)}</span>}
            <span className="text-red-600 font-bold text-lg">{formatCurrency(hargaJual)}</span>
          </div>

          {/* Stok */}
          <div className="flex items-center gap-2 text-xs mt-1 text-gray-500">
            <span className={`inline-block px-2 py-0.5 rounded-full font-medium ${stockClasses}`}>{stockText}</span>
          </div>

          {/* Tombol */}
          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-100 hover:text-red-700" asChild disabled={!stockAvailable}>
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
