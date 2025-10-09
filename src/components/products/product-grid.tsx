"use client";

import ProductCard, { Product } from "@/components/products/product-card";
import { getTotalStock } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p className="text-center">Tidak ada produk tersedia</p>;
  }

  // ✅ sortir: produk habis stok (0) ke belakang
  const sortedProducts = [...products].sort((a, b) => {
    const stockA = getTotalStock(a);
    const stockB = getTotalStock(b);
    if (stockA === 0 && stockB > 0) return 1; // a habis → pindah ke belakang
    if (stockB === 0 && stockA > 0) return -1; // b habis → pindah ke belakang
    return 0; // selain itu tetap
  });

  return (
    <div>
      {/* Grid produk */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {sortedProducts.map((produk) => (
          <ProductCard key={produk.id} product={produk} />
        ))}
      </div>
    </div>
  );
}
