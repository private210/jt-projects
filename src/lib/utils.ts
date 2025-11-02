import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

// Format currency to Indonesian Rupiah
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number to Rupiah with dots (for input fields)
// Example: 1000000 → "1.000.000"
export function formatRupiah(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Parse formatted Rupiah string to number
// Example: "1.000.000" → 1000000
export function parseRupiah(value: string): number {
  const cleaned = value.replace(/\./g, "");
  const parsed = parseInt(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// Format Rupiah with "Rp" prefix for display
// Example: 1000000 → "Rp 1.000.000"
export function formatRupiahWithPrefix(value: number): string {
  return `Rp ${formatRupiah(value)}`;
}

// Shorten large numbers for display
// Example: 1000000 → "1 Jt", 5000000 → "5 Jt"
export function formatRupiahShort(value: number): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1).replace(/\.0$/, "")} M`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")} Jt`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")} Rb`;
  }
  return value.toString();
}

// Get total stock from product options
export function getTotalStock(product: { options: { stock: number }[] }): number {
  if (!product.options || product.options.length === 0) return 0;
  return product.options.reduce((total, option) => total + (option.stock || 0), 0);
}

// Get lowest price from product options
export function getLowestPrice(product: { options: { hargaJual: number }[] }): number {
  if (!product.options || product.options.length === 0) return 0;
  return Math.min(...product.options.map((o) => o.hargaJual));
}

// Get highest original price from product options
export function getHighestOriginalPrice(product: { options: { hargaAsli: number }[] }): number {
  if (!product.options || product.options.length === 0) return 0;
  return Math.max(...product.options.map((o) => o.hargaAsli));
}

// Calculate discount percentage
export function calculateDiscount(hargaAsli: number, hargaJual: number): number {
  if (hargaAsli <= hargaJual) return 0;
  return Math.round((1 - hargaJual / hargaAsli) * 100);
}

// Format date to Indonesian format
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("id", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

// Price range presets for filters
export const PRICE_PRESETS = [
  { label: "< 1 Juta", min: 0, max: 1000000 },
  { label: "1 - 5 Juta", min: 1000000, max: 5000000 },
  { label: "5 - 10 Juta", min: 5000000, max: 10000000 },
  { label: "10 - 25 Juta", min: 10000000, max: 25000000 },
  { label: "25 - 50 Juta", min: 25000000, max: 50000000 },
  { label: "50 - 100 Juta", min: 50000000, max: 100000000 },
  { label: "> 100 Juta", min: 100000000, max: 1000000000 },
] as const;

// Validate price range (no hard limit, supports up to 1B+)
export function validatePriceRange(
  min: number,
  max: number,
  minLimit: number = 0,
  maxLimit: number = 1000000000
): [number, number] {
  const validMin = Math.max(minLimit, Math.min(min, maxLimit));
  let validMax = Math.max(minLimit, Math.min(max, maxLimit));

  // If user input min > max, auto-correct
  if (validMin >= validMax) {
    validMax = validMin + 50000;
  }

  return [validMin, validMax];
}
