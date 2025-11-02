"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/product-card";
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

interface Category {
  id: string;
  nama: string;
}

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  isFavorite: boolean;
  images: ProductImage[];
  options: ProductOption[];
  categories: Category[];
}

interface ProductGridProps {
  filters?: {
    search: string;
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    inStock: boolean;
  };
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("🔍 Fetching products from API...");
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("📦 Raw data from API:", data);
        console.log("📊 Total products received:", Array.isArray(data) ? data.length : 0);

        // Pastikan data adalah array
        const productsArray = Array.isArray(data) ? data : [];

        // Log setiap produk untuk debugging
        productsArray.forEach((product, index) => {
          console.log(`Product ${index + 1}:`, {
            id: product.id,
            nama: product.nama,
            images: product.images?.length || 0,
            options: product.options?.length || 0,
            categories: product.categories?.length || 0,
          });
        });

        // PENTING: Jangan filter produk di sini, biarkan semua produk ditampilkan
        // Filter akan dilakukan di bawah berdasarkan filters prop
        setProducts(productsArray);

        console.log("✅ Products set to state:", productsArray.length);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat memuat banner");
        }
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-500 font-medium mb-2">Terjadi kesalahan</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  console.log("🎯 Total products before filtering:", products.length);

  // Apply filters
  let filteredProducts = [...products];

  if (filters) {
    console.log("🔧 Applying filters:", filters);

    // Search filter
    if (filters.search && filters.search.trim() !== "") {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter((p) => p.nama.toLowerCase().includes(searchLower) || p.deskripsi.toLowerCase().includes(searchLower));
      console.log(`🔍 After search filter (${filters.search}):`, filteredProducts.length);
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((p) => p.categories && p.categories.some((cat) => filters.categories.includes(cat.id)));
      console.log(`📂 After category filter:`, filteredProducts.length);
    }

    // Price range filter
    if ((filters.priceRange && filters.priceRange[0] > 0) || filters.priceRange[1] < 50000000) {
      filteredProducts = filteredProducts.filter((p) => {
        if (!p.options || p.options.length === 0) return true; // Include products without options
        const minPrice = Math.min(...p.options.map((o) => o.hargaJual));
        const isInRange = minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1];
        return isInRange;
      });
      console.log(`💰 After price filter (${filters.priceRange[0]} - ${filters.priceRange[1]}):`, filteredProducts.length);
    }

    // Stock filter
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter((p) => {
        const stock = getTotalStock(p);
        return stock > 0;
      });
      console.log(`📦 After stock filter:`, filteredProducts.length);
    }
  }

  // Sort: out of stock products at the end
  const sortedProducts = filteredProducts.sort((a, b) => {
    const stockA = getTotalStock(a);
    const stockB = getTotalStock(b);
    if (stockA === 0 && stockB > 0) return 1;
    if (stockB === 0 && stockA > 0) return -1;
    return 0;
  });

  console.log("✅ Final products to display:", sortedProducts.length);

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-600 font-medium mb-2">Tidak ada produk tersedia</p>
          <p className="text-gray-500 text-sm">Silakan tambahkan produk di halaman admin</p>
        </div>
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-600 font-medium mb-2">Tidak ada produk yang sesuai</p>
          <p className="text-gray-500 text-sm">Coba ubah filter pencarian Anda</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Reset Filter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Product count info */}
      <div className="mb-4 text-sm text-gray-600">
        Menampilkan <span className="font-semibold text-gray-900">{sortedProducts.length}</span> dari <span className="font-semibold text-gray-900">{products.length}</span> produk
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
