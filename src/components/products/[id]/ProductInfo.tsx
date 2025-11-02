"use client";

import { useState, useEffect } from "react";
import { formatCurrency, getTotalStock } from "@/lib/utils";

interface ProductOption {
  id: string;
  warna: string;
  variant: string;
  hargaAsli: number;
  hargaJual: number;
  stock: number;
}

interface Product {
  nama: string;
  options: ProductOption[];
}

interface ProductInfoProps {
  product: Product;
}

interface Marketplace {
  tiktokshop?: string | null;
  tokopedia?: string | null;
  shopee?: string | null;
}

interface ContactData {
  nomor_wa?: string | null;
  whatsapp?: string | null; // link langsung (jika disimpan di DB)
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [marketplace, setMarketplace] = useState<Marketplace | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);

  // ✅ Fetch data marketplace
  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const res = await fetch("/api/marketplaces");
        if (!res.ok) throw new Error("Gagal memuat data marketplace");
        const data = await res.json();
        setMarketplace(data);
      } catch (err) {
        console.error("Error loading marketplace:", err);
      }
    };
    fetchMarketplace();
  }, []);

  // ✅ Fetch contact (untuk nomor WhatsApp / link)
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/contacts");
        if (!res.ok) throw new Error("Gagal memuat data kontak");
        const data = await res.json();
        setContact(data);
      } catch (err) {
        console.error("Error loading contact:", err);
      }
    };
    fetchContact();
  }, []);

  // Reset pilihan warna/varian ketika klik luar
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("[data-keep-selection]")) return;
      setSelectedColor(null);
      setSelectedVariant(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Marketplace logic
  const hasMarketplace = marketplace && (marketplace.tiktokshop || marketplace.tokopedia || marketplace.shopee);

  const selectedOption = product.options.find((o) => o.warna === selectedColor && o.variant === selectedVariant);
  const currentStock = selectedOption ? selectedOption.stock : 0;
  const displayOption = selectedOption || product.options?.[0];
  const hargaJual = displayOption?.hargaJual ?? 0;
  const hargaAsli = displayOption?.hargaAsli ?? 0;
  const discount = hargaAsli && hargaJual ? Math.round((1 - hargaJual / hargaAsli) * 100) : 0;

  const totalStock = getTotalStock(product);
  const stockAvailable = totalStock > 0;
  const stockText = stockAvailable ? `Tersedia` : "Habis";
  const stockClasses = stockAvailable ? "text-green-600 font-medium text-sm" : "text-red-600 font-medium text-sm";

  // ✅ WhatsApp logic (ambil dari contact)
  const whatsappNumber = contact?.nomor_wa || "6281234567890"; // fallback default
  const whatsappLinkFromDB = contact?.whatsapp || null;

  // Jika sudah disimpan link full (https://wa.me/...), gunakan itu
  const whatsappLink = whatsappLinkFromDB || `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Halo! Saya tertarik dengan produk ${product.nama}`)}`;

  return (
    <div className="space-y-5">
      {/* Nama Produk */}
      <h1 className="text-2xl font-bold">{product.nama}</h1>

      {/* Harga */}
      <div className="space-y-1">
        {hargaAsli > hargaJual && (
          <div className="flex items-center gap-2">
            <p className="line-through text-gray-400 text-lg">{formatCurrency(hargaAsli)}</p>
            {discount > 0 && <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">Hemat {discount}%</span>}
          </div>
        )}
        <p className="text-red-600 text-3xl md:text-5xl font-bold">{formatCurrency(hargaJual)}</p>
      </div>

      {/* Pilihan Warna */}
      {Array.from(new Set(product.options.map((o) => o.warna))).length > 0 && (
        <div>
          <p className="font-semibold mb-2">Warna</p>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(product.options.map((o) => o.warna))).map((color, idx) => {
              const hasStock = product.options.some((o) => o.warna === color && o.stock > 0);
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
      )}

      {/* Pilihan Varian */}
      {selectedColor && (
        <div>
          <p className="font-semibold mb-2">Varian</p>
          <div className="grid grid-cols-3 gap-2">
            {product.options
              .filter((o) => o.warna === selectedColor)
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
          <span className={stockClasses}>
            {stockText} • Stok {totalStock}
          </span>
        )}
      </div>

      {/* Tombol Marketplace */}
      {hasMarketplace && (
        <div className="mt-5">
          <p className="font-semibold text-gray-900 mb-3">Beli Sekarang di Marketplace Kami:</p>
          <div className="flex flex-col gap-2">
            {marketplace.tiktokshop && (
              <a
                href={marketplace.tiktokshop}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-black to-red-600 hover:from-gray-900 hover:to-red-700 text-white font-semibold py-3 rounded-lg text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                TikTok Shop
              </a>
            )}
            {marketplace.shopee && (
              <a
                href={marketplace.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Shopee
              </a>
            )}
            {marketplace.tokopedia && (
              <a
                href={marketplace.tokopedia}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Tokopedia
              </a>
            )}
          </div>
        </div>
      )}

      {/* Tombol WhatsApp */}
      <div className="mt-5 flex items-center gap-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-600 hover:text-white transition bg-white border border-gray-200 hover:border-gray-300 rounded-full px-4 py-2 shadow-md hover:bg-green-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
            <path d="M16 .3C7.3.3.3 7.3.3 16c0 2.8.7 5.5 2.1 8L0 32l8.2-2.2c2.4 1.3 5 2 7.8 2 8.7 0 15.7-7 15.7-15.7S24.7.3 16 .3zM16 28.7a12.6 12.6 0 01-6.9-2l-.5-.3-4.9 1.3 1.3-4.8-.3-.5A12.6 12.6 0 1128.6 16 12.6 12.6 0 0116 28.7z" />
          </svg>
          <span className="font-medium text-sm">Chat via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
