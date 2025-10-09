"use client";

import { useState } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/category";
import { brand } from "@/data/brands";

export default function FilterBar() {
  const minLimit = 0;
  const maxLimit = 50000000;
  const step = 50000;

  const [priceRange, setPriceRange] = useState<[number, number]>([minLimit, maxLimit]);
  const [inStock, setInStock] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Collapse state
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

const handleInputChange = (index: 0 | 1, value: number) => {
  const newRange: [number, number] = [...priceRange];
  newRange[index] = value;

  if (newRange[0] >= newRange[1]) {
    if (index === 0) newRange[0] = newRange[1] - step;
    else newRange[1] = newRange[0] + step;
  }

  // jangan lupa set state, misalnya
  setPriceRange(newRange);
};

  const handleReset = () => {
    setResetting(true);
    setPriceRange([minLimit, maxLimit]);
    setInStock(false);

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

        {/* Tombol Reset */}
        <button className="flex items-center text-xs text-gray-500 hover:text-red-500 transition" onClick={handleReset}>
          <motion.div animate={resetting ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <RotateCcw size={18} strokeWidth={2} />
          </motion.div>
          <span className="ml-1">Reset</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input type="text" placeholder="Cari Produk" className="pl-8" />
      </div>

      {/* Kategori Produk */}
      <div>
        <h3 className="font-medium text-sm mb-2">Kategori Produk</h3>
        <ul className="space-y-2">
          {(showAllCategories ? categories : categories.slice(0, 3)).map((item, i) => (
            <li key={i}>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="accent-red-500" />
                <span>{item}</span>
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
          {(showAllBrands ? brand : brand.slice(0, 3)).map((item, i) => (
            <li key={i}>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="accent-red-500" />
                <span>{item.name}</span>
              </label>
            </li>
          ))}
        </ul>
        {brand.length > 3 && (
          <button onClick={() => setShowAllBrands(!showAllBrands)} className="text-xs text-red-600 hover:underline mt-2">
            {showAllBrands ? "Sembunyikan" : "Lihat Semua"}
          </button>
        )}
      </div>

      {/* Status Stok */}
      <div>
        <h3 className="font-medium text-sm mb-2">Status Stok</h3>
        <label className="flex items-center space-x-2 text-sm">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-red-500" />
          <span>Tersedia</span>
        </label>
      </div>

      {/* Rentang Harga */}
      <div>
        <h3 className="font-medium text-sm mb-2">Rentang Harga</h3>
        <Slider value={priceRange} onValueChange={(val: number[]) => setPriceRange([val[0], val[1]] as [number, number])} min={minLimit} max={maxLimit} step={step} className="mb-4" />

        {/* Kolom Input harga */}
        <div className="flex items-center gap-2">
          <div className="relative w-1/2">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
            <Input type="number" value={priceRange[0]} onChange={(e) => handleInputChange(0, Number(e.target.value))} className="pl-8 text-sm" />
          </div>

          <span>-</span>

          <div className="relative w-1/2">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
            <Input type="number" value={priceRange[1]} onChange={(e) => handleInputChange(1, Number(e.target.value))} className="pl-8 text-sm" />
          </div>
        </div>
      </div>

      {/* Tombol Apply */}
      <Button className="w-full bg-red-600 text-white hover:bg-red-700">Terapkan Filter</Button>
    </aside>
  );
}
