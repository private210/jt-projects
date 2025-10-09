"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { brand } from "@/data/brands";
import { marketplace } from "@/data/marketplace";
import { motion } from "framer-motion";

export default function Footer() {
  const sosialMedia = [
    { name: "Facebook", href: "#", Icon: Facebook },
    { name: "Twitter", href: "#", Icon: Twitter },
    { name: "Instagram", href: "#", Icon: Instagram },
    { name: "LinkedIn", href: "#", Icon: Linkedin },
  ];

  return (
    <footer className="w-full bg-neutral-800 text-white mt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
        {/* Grid container dengan penyesuaian layout responsif */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 py-10">
          {/* Kolom 1: Profil */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-start mb-4">
              <div className="mr-3 flex-shrink-0">
                <Image src="/assets/logo.JPG" alt="Logo" width={40} height={40} className="h-10 w-10 object-cover rounded" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Joyo Tech ID</span>
                <span className="text-xs text-gray-300 mt-1">Solusi Teknologi Terpercaya</span>
              </div>
            </Link>

            <div className="space-y-2 text-sm text-gray-300">
              <p className="font-medium">+628123456789</p>
              <p className="font-medium">LY360@example.com</p>
              <p className="leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, quia?</p>
              <Link href="/contact" className="mt-3 inline-flex rounded-lg bg-joyo-red px-4 py-2 text-sm text-white transition-colors hover:bg-joyo-red/90">
                Hubungi Kami
              </Link>
            </div>
          </div>

          {/* Kolom 2: Navigation */}
          <div className="flex flex-col items-start">
            <h2 className="mb-4 text-lg font-semibold">Navigation</h2>
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Tentang Kami
              </Link>
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Katalog
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Hubungi Kami
              </Link>
            </nav>
          </div>

          {/* Kolom 3: Brand Partner */}
          <div className="flex flex-col">
            <h2 className="mb-4 text-lg font-semibold">Brand Partner</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {brand.map((b) => (
                <div key={b.id} className="bg-white rounded-lg p-2 flex items-center justify-center h-16 w-16">
                  <Image src={b.imageUrl} alt={b.name} width={48} height={32} className="h-8 w-12 object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 4: Marketplace & Social Media */}
          <div className="flex flex-col space-y-6">
            {/* Marketplace */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Marketplace</h2>
              <div className="flex flex-wrap gap-3">
                {marketplace.map(({ name, link, image }) => (
                  <Link key={name} href={link} className="bg-white rounded-lg p-2 flex items-center justify-center h-14 w-14 transition-transform hover:scale-105">
                    <Image src={image} alt={name} width={40} height={28} className="h-7 w-10 object-contain" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Social Media</h2>
              <div className="flex space-x-4">
                {sosialMedia.map(({ name, href, Icon }) => (
                  <Link key={name} href={href} className="bg-neutral-700 hover:bg-joyo-red rounded-full p-2 transition-colors" aria-label={name}>
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-700 py-6 text-center text-gray-400">
          <p className="text-sm">&copy; 2025 ArdianArt. All rights reserved.</p>
        </div>
      </motion.div>
      </div>
    </footer>
  );
}
