"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Banner } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function ManageBannersPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user?.publicMetadata.role !== "admin") {
      router.push("/");
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch("/api/banners");
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error("Error fetching banners:", error);
      // Demo data
      setBanners([
        {
          id: "1",
          title: "Promo Tahun Baru 2024",
          subtitle: "Dapatkan diskon spesial hingga 30%",
          image: "/images/banner1.jpg",
          link: "/products",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBannerStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        setBanners(banners.map((banner) => (banner.id === id ? { ...banner, isActive: !currentStatus } : banner)));
      }
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus banner ini?")) {
      try {
        await fetch(`/api/banners/${id}`, { method: "DELETE" });
        setBanners(banners.filter((banner) => banner.id !== id));
      } catch (error) {
        console.error("Error deleting banner:", error);
        alert("Gagal menghapus banner");
      }
    }
  };

  const filteredBanners = banners.filter((banner) => banner.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (user?.publicMetadata.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>
          <p className="text-gray-600">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Banner</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Banner
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari banner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBanners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <div className="relative">
              <Image src={banner.image} alt={banner.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${banner.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{banner.isActive ? "Aktif" : "Nonaktif"}</span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{banner.title}</h3>
              {banner.subtitle && <p className="text-gray-600 text-sm mb-4">{banner.subtitle}</p>}
              {banner.link && <p className="text-blue-600 text-sm mb-4">Link: {banner.link}</p>}

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => toggleBannerStatus(banner.id, banner.isActive)} className="flex-1">
                  {banner.isActive ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                  {banner.isActive ? "Nonaktifkan" : "Aktifkan"}
                </Button>

                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>

                <Button variant="destructive" size="sm" onClick={() => handleDelete(banner.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBanners.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Tidak ada banner yang ditemukan.</p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Banner Pertama
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
