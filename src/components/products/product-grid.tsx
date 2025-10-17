"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/product-card";
import { getTotalStock } from "@/lib/utils";

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  isFavorite: boolean;
  options: {
    id: string;
    hargaAsli: number;
    hargaJual: number;
    stock: number;
  }[];
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Gagal memuat produk");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Memuat produk...</p>;
  if (error) return <p className="text-center text-red-500">Terjadi kesalahan: {error}</p>;
  if (products.length === 0) return <p className="text-center">Tidak ada produk tersedia</p>;

  // ✅ Urutkan produk habis stok ke belakang
  const sortedProducts = [...products].sort((a, b) => {
    const stockA = getTotalStock(a);
    const stockB = getTotalStock(b);
    if (stockA === 0 && stockB > 0) return 1;
    if (stockB === 0 && stockA > 0) return -1;
    return 0;
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
