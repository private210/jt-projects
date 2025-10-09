import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { marketplace } from "@/data/marketplace";
import Link from "next/link";
import {MapPin, Phone, Store} from "lucide-react";

export default function CTASection() {
  return (
    <div className=" bg-gray-100 text-center py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Siap Meningkatkan Teknologi Anda?</h2>
        <p className="text-base text-gray-700 mb-8">Dapatkan penawaran dan promo menarik sekarang! Datanglah ke toko kami di Ponorogo atau hubungi kami melalui kontak di bawah ini. Dan Pesan sekarang di Marketplace Kami</p>
        <div className="space-x-4 text-center">
          <Button className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-joyo-red/50 hover:text-joyo-white mt-4">
            <MapPin className="w-8 h-8" />
            <Link href="https://goo.gl/maps/1GKQ7Y5o9L2wVYjQ9" target="_blank" rel="noopener noreferrer">
              Lihat Lokasi
            </Link>
          </Button>
          <Button className="bg-red-600/50 text-white px-4 py-2 rounded font-semibold hover:bg-joyo-red hover:text-joyo-white mt-4">
            <Phone className="w-8 h-8" />
            <Link href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
              Kontak Kami
            </Link>
          </Button>
          {/* Tombol Marketplace + PopUp */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white px-4 py-2 rounded font-semibold hover:bg-joyo-red/50 hover:text-joyo-white mt-4">
                <Store className="w-8 h-8" />
                Marketplace Kami
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold mb-4">Marketplace Kami</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                {marketplace.map((marketplace) => (
                  <a key={marketplace.name} href={marketplace.link} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 text-white rounded-lg text-center font-semibold transition-colors ${marketplace.color}`}>
                    {marketplace.name}
                  </a>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
