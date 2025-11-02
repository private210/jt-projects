"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getTotalStock } from "@/lib/utils";

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
  isFavorite: boolean;
  images: ProductImage[];
  options: ProductOption[];
}

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // Handle both array and object with products array
        const productsData = Array.isArray(data) ? data : data.products;

        if (Array.isArray(productsData)) {
          // Filter produk yang memiliki data valid
          const validProducts = productsData.filter((product) => {
            const hasValidImages = product.images && product.images.length > 0;
            const hasValidOptions = product.options && product.options.length > 0;
            return hasValidImages || hasValidOptions;
          });

          setProducts(validProducts);
        } else {
          console.error("Invalid products data format:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Gagal memuat produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter produk favorit yang ada stok
  const favoriteProducts = products.filter((p) => {
    const totalStock = getTotalStock(p);
    return p.isFavorite === true && totalStock > 0;
  });

  // Sort: produk dengan stok lebih banyak di depan
  const sortedFavorites = favoriteProducts.sort((a, b) => {
    const stockA = getTotalStock(a);
    const stockB = getTotalStock(b);
    return stockB - stockA;
  });

  const totalPages = Math.ceil(sortedFavorites.length / itemsPerPage);
  const currentProducts = sortedFavorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat produk favorit...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:px-12 bg-gray-50">
      <motion.div initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Produk Favorit</h2>
          <p className="text-gray-600 mb-8">Pilihan terbaik dan paling disukai pelanggan kami</p>
        </div>
      </motion.div>

      {currentProducts.length === 0 ? (
        <div className="container mx-auto px-4 text-center py-16">
          <div className="max-w-md mx-auto">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Produk Favorit</h3>
            <p className="text-gray-500">Produk favorit akan ditampilkan di sini setelah ditandai oleh admin</p>
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="container mx-auto px-4 mt-8">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button variant="outline" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;

                    // Show first page, last page, current page, and pages around current
                    if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                      return (
                        <Button key={i} variant={currentPage === pageNum ? "default" : "outline"} onClick={() => setCurrentPage(pageNum)} className={currentPage === pageNum ? "bg-red-600 hover:bg-red-700 text-white" : ""}>
                          {pageNum}
                        </Button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return (
                        <span key={i} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button variant="outline" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="disabled:opacity-50 disabled:cursor-not-allowed">
                  Next
                </Button>
              </div>

              <div className="text-center mt-4 text-sm text-gray-600">
                Halaman {currentPage} dari {totalPages}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
