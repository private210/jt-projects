'use client';

import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/product";

export default function ProductSections() {
  

  // ✅ Filter produk favorit saja
  const favoriteProducts = products.filter((p) => p.isFavorite);
  const itemsPerPage = 4; // jumlah produk per halaman
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favoriteProducts.length / itemsPerPage);

  // Produk yang ditampilkan sesuai halaman saat ini
  const currentProducts = favoriteProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="py-12 md:px-12 bg-gray-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }} // mulai 50px di bawah
        whileInView={{ y:0, opacity: 2 }} // masuk ke posisi normal
        transition={{ duration: 0.8, ease: "easeOut" }} // durasi lebih smooth
        viewport={{ once: false }}
      >
        <div className="container mx-auto px-4 justify-center text-center">
          <h2 className="text-3xl font-bold mb-6"> Produk Favorit </h2>
          <p className="text-gray-600 mb-4">Berikut adalah beberapa produk favorit pilihan pelanggan kami.</p>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:p-4 p-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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