'use client';

import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductSections() {
  const products = [
    {
      id: 1,
      name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Apple Watch Series 7 is a sleek and stylish smartwatch with a large, always-on Retina display, advanced health and fitness tracking features, and seamless integration with your iPhone.",
      price: "$399",
      rating: 4.5,
      inStock: true,
      isFavorite: true,
      isNew: true,
      isOnSale: true,
    },
    {
      id: 2,
      name: "Samsung Galaxy S21 Ultra 5G",
      imageUrl: "https://images.unsplash.com/photo-1611162617216-5f3c8a4f4e3b?q=80&w=1470&auto=format&fit=crop",
      description: "The Samsung Galaxy S21 Ultra 5G is a top-of-the-line smartphone with a sleek and modern design.",
      price: "$1199",
      rating: 4.7,
      inStock: true,
      isNew: true,
      isOnSale: false,
    },
    {
      id: 3,
      name: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
      imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1470&auto=format&fit=crop",
      description: "The Sony WH-1000XM4 headphones are a top-of-the-line wireless noise-cancelling headphones with a sleek and modern design.",
      price: "$349",
      rating: 4.6,
      inStock: false,
      isFavorite: false,
      isNew: false,
      isOnSale: true,
    },
    {
      id: 4,
      name: "Dell XPS 13 Laptop",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Dell XPS 13 is a high-performance laptop with a stunning InfinityEdge display, powerful Intel processors, and a sleek design.",
      price: "$999",
      rating: 4.4,
      inStock: true,
      isFavorite: true,
      isNew: false,
      isOnSale: false,
    },
    {
      id: 5,
      name: "Apple iPad Pro 11-inch",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Apple iPad Pro 11-inch is a powerful tablet with a stunning Liquid Retina display, A12Z Bionic chip, and support for the Apple Pencil and Magic Keyboard.",
      price: "$799",
      rating: 4.8,
      inStock: true,
      isFavorite: false,
      isNew: true,
      isOnSale: true,
    },
    {
      id: 6,
      name: "GoPro HERO9 Black",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The GoPro HERO9 Black is a versatile action camera with 5K video, 20MP photos, and advanced stabilization features.",
      price: "$399",
      rating: 4.5,
      inStock: false,
      isFavorite: true,
      isNew: false,
      isOnSale: false,
    },
    {
      id: 7,
      name: "Nintendo Switch Console",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Nintendo Switch is a versatile gaming console that can be used as a handheld device or connected to a TV for a larger screen experience.",
      price: "$299",
      rating: 4.7,
      inStock: true,
      isFavorite: false,
      isNew: true,
      isOnSale: true,
    },
    {
      id: 8,
      name: "Fitbit Charge 5 Advanced Fitness Tracker",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Fitbit Charge 5 is an advanced fitness tracker with built-in GPS, heart rate monitoring, and sleep tracking.",
      price: "$179",
      rating: 4.3,
      inStock: true,
      isFavorite: true,
      isNew: false,
      isOnSale: false,
    },
    {
      id: 9,
      name: "Canon EOS R5 Mirrorless Camera",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Canon EOS R5 is a professional-grade mirrorless camera with a 45MP full-frame sensor and advanced autofocus capabilities.",
      price: "$3899",
      rating: 4.9,
      inStock: false,
      isFavorite: false,
      isNew: true,
      isOnSale: true,
    },
    {
      id: 10,
      name: "Bose QuietComfort 35 II Wireless Headphones",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Bose QuietComfort 35 II are wireless headphones with world-class noise cancellation and superior sound quality.",
      price: "$299",
      rating: 4.6,
      inStock: true,
      isFavorite: true,
      isNew: false,
      isOnSale: false,
    },
    {
      id: 11,
      name: "Microsoft Surface Pro 7",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Microsoft Surface Pro 7 is a versatile 2-in-1 laptop with a detachable keyboard and touchscreen display.",
      price: "$749",
      rating: 4.5,
      inStock: true,
      isFavorite: false,
      isNew: true,
      isOnSale: true,
    },
    {
      id: 12,
      name: "Jabra Elite 75t Earbuds",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Jabra Elite 75t are true wireless earbuds with a comfortable fit and excellent sound quality.",
      price: "$179",
      rating: 4.4,
      inStock: false,
      isFavorite: true,
      isNew: false,
      isOnSale: false,
    },
    {
      id: 13,
      name: "Razer Blade 15 Gaming Laptop",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Razer Blade 15 is a powerful gaming laptop with a high-performance processor and graphics card.",
      price: "$1599",
      rating: 4.7,
      inStock: true,
      isFavorite: false,
      isNew: true,
      isOnSale: true,
    },
    {
      id: 14,
      name: "Apple AirPods Pro",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "The Apple AirPods Pro are wireless earbuds with active noise cancellation and a customizable fit.",
      price: "$249",
      rating: 4.8,
      inStock: true,
      isFavorite: true,
      isNew: false,
      isOnSale: false,
    },
    {
      id: 15,
      name: "Samsung Galaxy Buds Pro",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      price: "$199",
      description: "The Samsung Galaxy Buds Pro are wireless earbuds with a powerful sound system and a sleek design.",
      rating: 4.5,
      inStock: false,
      isFavorite: false,
      isNew: true,
      isOnSale: true,
    },
    {
      id: 16,
      name: "DJI Mavic Air 2 Drone",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      description: "Capture stunning aerial footage with the DJI Mavic Air 2 drone, featuring 4K video and advanced obstacle avoidance.",
      price: "$799",
      rating: 4.6,
      inStock: true,
      isFavorite: true,
      isNew: false,
      isOnSale: false,
    },
  ];

  // ✅ Filter produk favorit saja
  const favoriteProducts = products.filter((p) => p.isFavorite);
  const itemsPerPage = 4; // jumlah produk per halaman
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favoriteProducts.length / itemsPerPage);

  // Produk yang ditampilkan sesuai halaman saat ini
  const currentProducts = favoriteProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="py-12 md:px-12 bg-gray-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }} // mulai 50px di bawah
        whileInView={{ y:0, opacity: 2 }} // masuk ke posisi normal
        transition={{ duration: 0.8, ease: "easeOut" }} // durasi lebih smooth
        viewport={{ once: false }}
      >
        <div className="container mx-auto px-4 justify-center text-center">
          <h2 className="text-3xl font-bold mb-6"> Produk Favorit </h2>
          <p className="text-gray-600 mb-4">Berikut adalah beberapa produk favorit pilihan pelanggan kami.</p>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:p-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Manual */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </Button>
          ))}

          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </section>
  );
}