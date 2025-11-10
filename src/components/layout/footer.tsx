"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/app/contexts/SiteSettingsContext";

interface BrandPartner {
  id: string;
  nama: string;
  image: string | null;
}

interface Marketplace {
  id: string;
  tiktokshop: string | null;
  tokopedia: string | null;
  shopee: string | null;
}

interface Contact {
  email: string;
  nomor_wa: string;
  whatsapp: string | null;
  instagram: string | null;
  tiktok: string | null;
  facebook: string | null;
  youtube: string | null;
}

export default function Footer() {
  const { settings } = useSiteSettings();
  const [brands, setBrands] = useState<BrandPartner[]>([]);
  const [marketplace, setMarketplace] = useState<Marketplace | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch brands and contact from about API
      const aboutRes = await fetch("/api/about");
      const aboutData = await aboutRes.json();
      if (aboutData) {
        setBrands(aboutData.brandPartner || []);
        if (aboutData.contact && aboutData.contact.length > 0) {
          setContact(aboutData.contact[0]);
        }
      }

      // Fetch marketplace
      const [contactRes, marketplaceRes] = await Promise.all([fetch("/api/contacts"), fetch("/api/marketplaces")]);

      const contactData = await contactRes.json();
      const marketplaceData = await marketplaceRes.json();

      setContact(contactData);
      setMarketplace(marketplaceData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const logoUrl = settings?.logo || "/assets/logo.JPG";
  const companyName = settings?.nama_company || "Joyo Tech ID";

  // Social Media Links
  const socialMedia = [
    {
      name: "Instagram",
      link: contact?.instagram,
      logo: "/assets/Instagram.png",
      bg: "from-pink-500 via-red-500 to-yellow-500", // gradient khas Instagram
    },
    {
      name: "Facebook",
      link: contact?.facebook,
      logo: "/assets/Facebook.png",
      bg: "bg-[#1877F2]",
    },
    {
      name: "TikTok",
      link: contact?.tiktok,
      logo: "/assets/Tiktok.png",
      bg: "bg-[#010101]",
    },
    {
      name: "Whatsapp",
      link: contact?.whatsapp,
      logo: "/assets/Whatsapp.png",
      bg: "bg-[#25D366]",
    },
    {
      name: "YouTube",
      link: contact?.youtube,
      logo: "/assets/Youtube.png",
      bg: "bg-[#FF0000]",
    },
  ].filter((item) => item.link);

  const marketplaceLinks = [
    {
      name: "Tokopedia",
      link: marketplace?.tokopedia,
      logo: "/assets/tokped.png",
      bg: "bg-[#03AC0E]",
    },
    {
      name: "Shopee",
      link: marketplace?.shopee,
      logo: "/assets/Shopee.png",
      bg: "bg-[#EE4D2D]",
    },
    {
      name: "TikTok Shop",
      link: marketplace?.tiktokshop,
      logo: "/assets/tiktokshop.png",
      bg: "bg-[#000000]",
    },
  ].filter((item) => item.link);

  return (
    <footer className="w-full bg-neutral-800 text-white mt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: false }}>
          {/* Grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 py-10">
            {/* Kolom 1: Profil */}
            <div className="flex flex-col">
              <Link href="/" className="flex items-start mb-4">
                <div className="mr-3 shrink-0">
                  <Image src={logoUrl} alt="Logo" width={40} height={40} className="h-10 w-10 object-cover rounded" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">{companyName}</span>
                  <span className="text-xs text-gray-300 mt-1">Solusi Teknologi Terpercaya</span>
                </div>
              </Link>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="leading-relaxed">{settings?.metadesc || "Menyediakan berbagai produk teknologi berkualitas"}</p>
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
              {brands.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {brands.slice(0, 8).map((brand) => (
                    <div key={brand.id} className="bg-white rounded-lg p-2 flex items-center justify-center h-16 w-16">
                      {brand.image ? <Image src={brand.image} alt={brand.nama} width={48} height={32} className="h-8 w-12 object-contain" /> : <span className="text-xs text-gray-400">{brand.nama}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Belum ada brand partner</p>
              )}
            </div>
            {/* Kolom 4: Marketplace & Social Media */}
            <div className="flex flex-col space-y-6">
              {/* Marketplace */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">Marketplace</h2>
                <div className="flex flex-wrap gap-3">
                  {marketplaceLinks.map((link) => (
                                <a key={link.name} href={link.link ?? "#"} target="_blank" rel="noopener noreferrer" className={`w-16 h-16 rounded-full flex items-center justify-center ${link.bg} hover:scale-105 transition-transform shadow-md`}>
                                  <Image src={link.logo} alt={link.name} width={50} height={50} className="invert brightness-0 saturate-200" /> 
                                </a>
                              ))}
                  {marketplaceLinks.length === 0 && <p className="text-gray-400 text-sm">Belum ada marketplace</p>}
                </div>
              </div>
              {/* Social Media */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">Social Media</h2>
                <div className="flex space-x-4">
                   {socialMedia.map((link) => (
                                <a key={link.name} href={link.link ?? "#"} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-br ${link.bg} hover:scale-105 transition-transform shadow-md`}>
                                  <Image src={link.logo} alt={link.name} width={24} height={24} className="invert brightness-0 saturate-200" />
                                </a>
                              ))}
                  {socialMedia.length === 0 && <p className="text-gray-400 text-sm">Belum ada social media</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-700 py-6 text-center text-gray-400">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
