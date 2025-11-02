"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Phone, Store } from "lucide-react";

interface Contact {
  id: string;
  email: string;
  nomor_wa: string;
  alamat: string;
  maps_link?: string | null;
  jam_operasional: string;
}

interface Marketplace {
  id: string;
  tiktokshop?: string | null;
  tokopedia?: string | null;
  shopee?: string | null;
}

export default function CTASection() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [marketplace, setMarketplace] = useState<Marketplace | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactRes, marketplaceRes] = await Promise.all([fetch("/api/contacts"), fetch("/api/marketplaces")]);

        const contactData = await contactRes.json();
        const marketplaceData = await marketplaceRes.json();

        // Gunakan data pertama jika array
        if (Array.isArray(contactData) && contactData.length > 0) {
          setContact(contactData[0]);
        } else if (contactData && !Array.isArray(contactData)) {
          setContact(contactData);
        }

        if (Array.isArray(marketplaceData) && marketplaceData.length > 0) {
          setMarketplace(marketplaceData[0]);
        } else if (marketplaceData && !Array.isArray(marketplaceData)) {
          setMarketplace(marketplaceData);
        }
      } catch (error) {
        console.error("Error fetching CTA data:", error);
      }
    }

    fetchData();
  }, []);

  const marketplaceLinks = [
    {
      name: "Shopee",
      url: marketplace?.shopee?.trim(),
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Tokopedia",
      url: marketplace?.tokopedia?.trim(),
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      name: "TikTok Shop",
      url: marketplace?.tiktokshop?.trim(),
      color: "bg-black hover:bg-gray-800",
    },
  ].filter((item) => !!item.url && item.url !== "#");

  return (
    <section className="bg-gray-100 text-center py-12 mt-10 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Meningkatkan Teknologi Anda?</h2>
        <p className="text-base text-gray-700 mb-8 max-w-2xl mx-auto">Dapatkan penawaran dan promo menarik sekarang! Datanglah ke toko kami atau hubungi kami melalui kontak di bawah ini. Pesan juga di marketplace kami.</p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Tombol Lihat Lokasi */}
          {contact?.maps_link && (
            <Link href={contact.maps_link} target="_blank" rel="noopener noreferrer">
              <Button className="bg-red-600 text-white font-semibold hover:bg-red-700/50 hover:text-joyo-white flex items-center gap-2 px-5 py-2 rounded-lg">
                <MapPin className="w-5 h-5" />
                Lihat Lokasi
              </Button>
            </Link>
          )}

          {/* Tombol Kontak WhatsApp */}
          {contact?.nomor_wa && (
            <Link href={`https://wa.me/${contact.nomor_wa.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 text-white font-semibold hover:bg-green-600/50 hover:text-joyo-white flex items-center gap-2 px-5 py-2 rounded-lg">
                <Phone className="w-5 h-5" />
                Kontak Kami
              </Button>
            </Link>
          )}

          {/* Tombol Marketplace */}
          {marketplaceLinks.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 text-white font-semibold hover:bg-blue-700/50 hover:text-joyo-white flex items-center gap-2 px-5 py-2 rounded-lg">
                  <Store className="w-5 h-5" />
                  Marketplace Kami
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black rounded-xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold mb-4">Marketplace Kami</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                  {marketplaceLinks.map((item) => (
                    <a key={item.name} href={item.url || "#"} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 text-white rounded-lg text-center font-semibold transition-colors ${item.color}`}>
                      {item.name}
                    </a>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </section>
  );
}
