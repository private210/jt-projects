"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const sosialMedia = [
    { name: "Facebook", href: "#", Icon: Facebook },
    { name: "Twitter", href: "#", Icon: Twitter },
    { name: "Instagram", href: "#", Icon: Instagram },
    { name: "LinkedIn", href: "#", Icon: Linkedin },
  ];

  // contoh data logo brand (pakai 14 item agar grid rapi seperti gambar)
  const brands = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    src:
      i < 2
        ? [
            "https://images.unsplash.com/photo-1696041756125-257354c459a9?q=80&w=1631&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624947216381-b994eb54e9b7?q=80&w=1212&auto=format&fit=crop",
          ][i]
        : "https://images.unsplash.com/photo-1628953137622-888238bea028?q=80&w=1170&auto=format&fit=crop",
    alt: `Brand ${i + 1}`,
  }));

  return (
    <footer className="w-full bg-neutral-800 text-white mt-0">
      {/* wrapper */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 4 kolom: urutan selalu sama di semua breakpoints */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 py-10 md:grid-cols-4">
          {/* Kolom 1: Profil */}
          <div className="flex flex-col md:items-start">
            <Link href="/" className="flex items-center">
              <span className="mr-4 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded">
                <Image
                  src="/assets/logo.JPG"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-cover"
                />
              </span>
              <span className="flex flex-col text-left">
                <span className="text-xl font-bold leading-tight">Joyo Tech ID</span>
                <span className="text-xs text-gray-300">Solusi Teknologi Terpercaya</span>
              </span>
            </Link>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-300 text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora corporis maxime
              adipisci necessitatibus cupiditate alias eius quis assumenda tenetur vitae.
            </p>

            <div className="mt-4 flex space-x-4">
              {sosialMedia.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Kolom 2: Navigation */}
          <nav className="flex flex-col items-center md:items-center">
            <h2 className="mb-3 text-lg font-semibold">Navigation</h2>
            <ul className="space-y-2 text-center">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-300 hover:text-white">
                  Katalog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kolom 3: Brand Partner */}
          <div className="flex flex-col items-center">
            <h2 className="mb-3 text-lg font-semibold">Brand Partner</h2>

            {/* grid responsif: tetap terlihat rapih dari HP sampai desktop */}
            <div className="grid gap-2  md:grid-cols-4 lg:grid-cols-4 grid-cols-4">
              {brands.map((b) => (
                <div key={b.id} className="h-10 w-14 overflow-hidden rounded">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={56}
                    height={40}
                    sizes="56px"
                    className="h-10 w-14 object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 4: Contact */}
          <div className="flex flex-col items-center md:items-end">
            <h2 className="mb-3 text-lg font-semibold">Contact Us</h2>
            <div className="space-y-2 text-center md:text-right">
              <p className="text-sm text-gray-300">
                Have questions or need help? Reach out to us!
              </p>
              <p className="font-medium">+628123456789</p>
              <p className="font-medium">L7S6o@example.com</p>
              <p className="text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, quia?
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-lg bg-joyo-red px-6 py-2 text-white transition-colors hover:bg-joyo-red/90"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        {/* garis & copyright */}
        <div className="border-t border-neutral-700 py-6 text-center text-gray-400">
          <p>&copy; 2025 ArdianArt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
