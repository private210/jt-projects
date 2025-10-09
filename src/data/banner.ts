export const banners = [
  {
    id: 1,
    imageUrl: "https://i.pinimg.com/1200x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg",
    title: "Promo Spesial Bulan Ini",
    description: "Dapatkan diskon hingga 50% untuk produk pilihan selama bulan ini.",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
    title: "Layanan Konsultasi Gratis",
    description: "Hubungi kami untuk mendapatkan konsultasi gratis mengenai kebutuhan teknologi Anda.",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1470&auto=format&fit=crop",
    title: "Produk Terbaru Telah Tersedia",
    description: "Jelajahi koleksi produk terbaru kami yang baru saja diluncurkan.",
  },
];

// type / interface sebaiknya PascalCase (konvensi TypeScript)
export interface Banner {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}
