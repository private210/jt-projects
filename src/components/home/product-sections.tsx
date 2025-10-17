"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  stock: number;
  rating: number;
  imageUrl: string[];
  inStock: boolean;
  isFavorite: boolean;
}

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter produk favorit
  const favoriteProducts = products.filter((p) => p.isFavorite);
  const totalPages = Math.ceil(favoriteProducts.length / itemsPerPage);

  const currentProducts = favoriteProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </section>
    );
  }

  return (
    <section className="py-12 md:px-12 bg-gray-50">
      <motion.div initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Produk Favorit</h2>
          <p className="text-gray-600 mb-4">Berikut adalah beberapa produk favorit pilihan pelanggan kami.</p>
        </div>
      </motion.div>

      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Tidak ada produk favorit.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:p-4 p-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Manual */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </Button>
          ))}

          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
