"use client";

import { useState } from "react";
import FilterBar from "@/components/products/filter-bar";
import ProductGrid from "@/components/products/product-grid";
import CTASection from "@/components/products/cta-sections";
import BannersSections from "@/components/products/banner-sections";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: "",
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 50000000] as [number, number],
    inStock: false,
  });

  return (
    <div className="container mx-auto py-10 px-4 md:px-20">
      {/* Banners */}
      <BannersSections />
      {/* Product Catalog */}
      <h1 className="text-3xl font-bold mb-8">Katalog Produk</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <FilterBar onFilterChange={setFilters} />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid filters={filters} />
        </div>
      </div>
          <CTASection />
    </div>
  );
}
