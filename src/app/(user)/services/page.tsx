"use client";

import { useEffect, useState } from "react";
import { Service } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Clock, Shield, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      // Fallback demo data
      setServices([
        {
          id: "1",
          name: "Instalasi CCTV Profesional",
          description: "Pemasangan sistem keamanan CCTV dengan kualitas terbaik. Kami menggunakan camera berkualitas tinggi dengan resolusi 4K, DVR yang handal, dan kabel yang tahan lama. Garansi 1 tahun untuk semua perangkat.",
          price: 1500000,
          image: "/images/services/cctv-installation.jpg",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Servis & Maintenance Komputer",
          description: "Perbaikan dan perawatan komputer/laptop oleh teknisi berpengalaman. Service termasuk cleaning, software installation, hardware repair, dan optimization. Gratis diagnostik untuk masalah software.",
          price: 250000,
          image: "/images/services/computer-repair.jpg",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          name: "Instalasi Jaringan Internet",
          description: "Pemasangan jaringan LAN/WiFi untuk rumah dan kantor. Kami menyediakan router berkualitas, access point, switch, dan kabel jaringan terbaik. Optimasi jaringan untuk kecepatan maksimal.",
          price: 800000,
          image: "/images/services/network-installation.jpg",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const serviceFeatures = [
    { icon: Clock, text: "Pelayanan Cepat 24/7" },
    { icon: Shield, text: "Bergaransi Resmi" },
    { icon: Users, text: "Teknisi Berpengalaman" },
    { icon: Wrench, text: "Alat Lengkap dan Modern" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Layanan Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Berbagai layanan teknologi profesional untuk memudahkan kehidupan digital Anda. Dilayani oleh teknisi berpengalaman dengan garansi resmi.</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {serviceFeatures.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200">
                {service.image ? (
                  <Image src={service.image} alt={service.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Wrench className="w-12 h-12" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-red-600 text-lg">{service.price ? formatPrice(service.price) : "Hubungi untuk harga"}</span>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">Pesan Layanan</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Butuh Layanan Khusus?</h2>
            <p className="mb-6 opacity-90">Hubungi kami untuk konsultasi gratis dan dapatkan solusi teknologi terbaik yang disesuaikan dengan kebutuhan Anda.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Wrench className="w-4 h-4 mr-2" />
                Konsultasi Gratis
              </Button>
              <Button className="bg-white text-red-600 hover:bg-gray-100">Hubungi Kami</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
