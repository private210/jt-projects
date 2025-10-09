import BannersSections from "@/components/home/banners-sections";
import ProductGrid from "@/components/products/product-grid";
import FilterBar from "@/components/products/filter-bar";
import CTASection from "@/components/products/cta-sections";
import { products } from "@/data/product"; //

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function ProductPage() {
  return (
    <div className="bg-gray-50 md:pt-12">
      <BannersSections />
      <h2 className="text-center font-bold text-xl mb-6">✨ Semua Product ✨</h2>
      <div className="container mx-auto px-12 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* === DESKTOP FILTER === */}
        <div className="hidden lg:block lg:col-span-1 z-10  sticky top-30 self-start">
          <FilterBar />
        </div>

        {/* === MOBILE FILTER (Sheet) === */}
        <div className="block lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Filter Produk</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <FilterBar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Konten utama */}  
        <main className="lg:col-span-3">
          <ProductGrid products={products} />
        </main>
      </div>
      <CTASection />
    </div>
  );
}
