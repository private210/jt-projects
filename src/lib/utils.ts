import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}


// lib/utils.ts
export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(value);
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

import { Product } from "@/data/product";

export function getTotalStock(product: Product): number {
  return product.options.reduce((sum, option) => sum + option.stock, 0);
}

export const calculateDiscount = (oldPrice?: number, price?: number): number => {
  if (!oldPrice || !price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
};


