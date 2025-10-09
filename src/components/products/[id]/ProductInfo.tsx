"use client";

import { Product } from "@/data/product";
import { useState, useEffect, useRef } from "react";
import { formatCurrency, getTotalStock } from "@/lib/utils";
interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // reset pilihan saat klik diluar warna/varian/2 tombol utama
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;

      // kalau target ada atribut ini → jangan reset
      if (target.closest("[data-keep-selection]")) return;

      // selain itu, reset
      setSelectedColor(null);
      setSelectedVariant(null);
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const discount = product.oldPrice && product.price ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const selectedOption = product.options.find((o) => o.color === selectedColor && o.variant === selectedVariant);
  const currentStock = selectedOption ? selectedOption.stock : 0;

  const totalStock = getTotalStock(product);
  const stockAvailable = totalStock > 0;
  const stockText = stockAvailable ? `Tersedia` : "Habis";
  const stockClasses = stockAvailable ? "text-green-600 font-medium text-sm" : "text-red-600 font-medium text-sm";

  return (
    <div ref={containerRef} className="space-y-5">
      {/* Judul */}
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
        </div>
        <span className="text-gray-600 text-sm">{product.rating}</span>
      </div>

      {/* Harga */}
      <div className="space-y-1">
        {product.oldPrice && (
          <div className="flex items-center gap-2">
            <p className="line-through text-gray-400 text-lg">{formatCurrency(product.oldPrice)}</p>
            {discount > 0 && <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">Hemat {discount}%</span>}
          </div>
        )}
        <p className="text-red-600 text-3xl font-bold">{formatCurrency(product.price)}</p>
      </div>

      {/* Warna */}
      <div>
        <p className="font-semibold mb-2">Warna</p>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(product.options.map((o) => o.color))).map((color, idx) => {
            const hasStock = product.options.some((o) => o.color === color && o.stock > 0);
            return (
              <button
                key={idx}
                data-keep-selection
                onClick={() => setSelectedColor(color)}
                disabled={!hasStock}
                className={`border rounded-lg py-2 px-3 text-sm transition-colors ${selectedColor === color ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-500"} ${!hasStock ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>

      {/* Varian */}
      {selectedColor && (
        <div>
          <p className="font-semibold mb-2">Varian</p>
          <div className="grid grid-cols-3 gap-2">
            {product.options
              .filter((o) => o.color === selectedColor)
              .map((option, idx) => (
                <button
                  key={idx}
                  data-keep-selection
                  onClick={() => setSelectedVariant(option.variant)}
                  disabled={option.stock === 0}
                  className={`border rounded-lg py-2 px-3 text-sm transition-colors ${selectedVariant === option.variant ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-500"} ${
                    option.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {option.variant}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Stok */}
      <div>
        {selectedOption ? (
          currentStock > 0 ? (
            <p className="text-green-600 font-medium text-sm">Tersedia • Stok {currentStock}</p>
          ) : (
            <p className="text-red-600 font-medium text-sm">Stok Habis</p>
          )
        ) : (
          <span className={`${stockClasses}`}>
            {stockText} • Stok {totalStock}
          </span>
        )}
      </div>

      {/* Tombol */}
      {product.marketplaces && product.marketplaces.length > 0 && (
        <div className="space-y-4 pt-4">
          <p className="font-semibold mb-2">Beli di Marketplace:</p>
          <div className="grid grid-cols-3 gap-3">
            {product.marketplaces.map((m, idx) => (
              <a
                key={idx}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition-colors ${
                  m.name === "Shopee" ? "bg-orange-500 hover:bg-orange-600" : m.name === "Tokopedia" ? "bg-green-600 hover:bg-green-700" : "bg-black hover:bg-gray-800" // TikTok Shop
                }`}
              >
                {/* Ikon marketplace (opsional bisa pakai SVG) */}
                <span>{m.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
