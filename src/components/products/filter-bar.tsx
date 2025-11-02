"use client";

import { useState, useEffect } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatRupiah, parseRupiah, PRICE_PRESETS, validatePriceRange } from "@/lib/utils";

interface Category {
  id: string;
  nama: string;
}

interface BrandPartner {
  id: string;
  nama: string;
}

interface FilterBarProps {
  onFilterChange?: (filters: { search: string; categories: string[]; brands: string[]; priceRange: [number, number]; inStock: boolean }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const minLimit = 0;
  const maxLimit = 50000000;
  const step = 50000;

  // Temporary filter states (before apply)
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([minLimit, maxLimit]);
  const [inStock, setInStock] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Applied filter states (after apply button clicked)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [minLimit, maxLimit] as [number, number],
    inStock: false,
  });

  const [resetting, setResetting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<BrandPartner[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Check if there are pending changes
  const hasPendingChanges = () => {
    return (
      searchQuery !== appliedFilters.search ||
      inStock !== appliedFilters.inStock ||
      priceRange[0] !== appliedFilters.priceRange[0] ||
      priceRange[1] !== appliedFilters.priceRange[1] ||
      JSON.stringify(selectedCategories.sort()) !== JSON.stringify(appliedFilters.categories.sort()) ||
      JSON.stringify(selectedBrands.sort()) !== JSON.stringify(appliedFilters.brands.sort())
    );
  };

  useEffect(() => {
    async function fetchFilterData() {
      try {
        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();
        setCategories(Array.isArray(catData) ? catData : []);

        const brandRes = await fetch("/api/brands");
        const brandData = await brandRes.json();
        setBrands(Array.isArray(brandData) ? brandData : []);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } 
    }

    fetchFilterData();
  }, []);

  // Only emit filter changes when applied filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(appliedFilters);
    }
  }, [appliedFilters, onFilterChange]);

  const handleInputChange = (index: 0 | 1, value: string) => {
    const numericValue = parseRupiah(value);
    const newRange: [number, number] = [...priceRange];
    newRange[index] = numericValue;

    // Validate and correct the range
    const validatedRange = validatePriceRange(newRange[0], newRange[1], minLimit, maxLimit);
    setPriceRange(validatedRange);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]));
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]));
  };

  const handlePricePreset = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery,
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
      inStock,
    });
  };

  const handleReset = () => {
    setResetting(true);

    // Reset temporary states
    setSearchQuery("");
    setPriceRange([minLimit, maxLimit]);
    setInStock(false);
    setSelectedCategories([]);
    setSelectedBrands([]);

    // Reset applied filters
    setAppliedFilters({
      search: "",
      categories: [],
      brands: [],
      priceRange: [minLimit, maxLimit],
      inStock: false,
    });

    setTimeout(() => setResetting(false), 600);
  };

  return (
    <aside className="bg-white p-4 rounded-lg shadow w-full h-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <h2 className="font-semibold text-sm">Filter Produk</h2>
        </div>

        <button className="flex items-center text-xs text-gray-500 hover:text-red-500 transition cursor-pointer" onClick={handleReset}>
          <motion.div animate={resetting ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <RotateCcw size={18} strokeWidth={2} />
          </motion.div>
          <span className="ml-1">Reset</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input type="text" placeholder="Cari Produk" className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* Kategori Produk */}
      <div>
        <h3 className="font-medium text-sm mb-2">Kategori Produk</h3>
           <ul className="space-y-2">
              {(showAllCategories ? categories : categories.slice(0, 3)).map((item) => (
                <li key={item.id}>
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" className="accent-red-500" checked={selectedCategories.includes(item.id)} onChange={() => handleCategoryChange(item.id)} />
                    <span>{item.nama}</span>
                  </label>
                </li>
              ))}
            </ul>
            {categories.length > 3 && (
              <button onClick={() => setShowAllCategories(!showAllCategories)} className="text-xs text-red-600 hover:underline mt-2">
                {showAllCategories ? "Sembunyikan" : "Lihat Semua"}
              </button>
            )}
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium text-sm mb-2">Brands</h3>
            <ul className="space-y-2">
              {(showAllBrands ? brands : brands.slice(0, 3)).map((item) => (
                <li key={item.id}>
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" className="accent-red-500" checked={selectedBrands.includes(item.id)} onChange={() => handleBrandChange(item.id)} />
                    <span>{item.nama}</span>
                  </label>
                </li>
              ))}
            </ul>
            {brands.length > 3 && (
              <button onClick={() => setShowAllBrands(!showAllBrands)} className="text-xs text-red-600 hover:underline mt-2">
                {showAllBrands ? "Sembunyikan" : "Lihat Semua"}
              </button>
            )}
      </div>

      {/* Status Stok */}
      <div>
        <h3 className="font-medium text-sm mb-2">Status Stok</h3>
        <label className="flex items-center space-x-2 text-sm cursor-pointer">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-red-500" />
          <span>Tersedia</span>
        </label>
      </div>

      {/* Rentang Harga */}
      <div>
        <h3 className="font-medium text-sm mb-2">Rentang Harga</h3>

        {/* Price Slider */}
        <Slider value={priceRange} onValueChange={(val: number[]) => setPriceRange([val[0], val[1]] as [number, number])} min={minLimit} max={maxLimit} step={step} className="mb-4" />

        {/* Price Input Fields with Rupiah Format */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative w-1/2">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">Rp</span>
            <Input type="text" value={formatRupiah(priceRange[0])} onChange={(e) => handleInputChange(0, e.target.value)} className="pl-7 text-xs" placeholder="0" />
          </div>

          <span className="text-gray-400">-</span>

          <div className="relative w-1/2">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-medium">Rp</span>
            <Input type="text" value={formatRupiah(priceRange[1])} onChange={(e) => handleInputChange(1, e.target.value)} className="pl-7 text-xs" placeholder="50.000.000" />
          </div>
        </div>

        {/* Price Range Suggestions */}
        <div className="space-y-1.5">
          <p className="text-xs text-gray-500 mb-2">Rentang Harga Cepat:</p>
          <div className="grid grid-cols-2 gap-1.5">
            {PRICE_PRESETS.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePricePreset(preset.min, preset.max)}
                className={`text-xs h-8 ${priceRange[0] === preset.min && priceRange[1] === preset.max ? "bg-red-50 border-red-500 text-red-700" : "hover:bg-gray-50"}`}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tombol Terapkan */}
      <Button className="w-full bg-red-600 text-white hover:bg-red-700 relative" onClick={handleApplyFilters}>
        Terapkan Filter
        {hasPendingChanges() && <span className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse" />}
      </Button>

      {/* Indicator for pending changes */}
      {hasPendingChanges() && <p className="text-xs text-center text-amber-600 -mt-2 font-medium">Ada perubahan yang belum diterapkan</p>}
    </aside>
  );
}
