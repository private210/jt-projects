"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Banner, BannerFormData } from "@/types";
import BannerDialog  from "@/components/(admin)/banners/banners-dialog";
import  BannerTable  from "@/components/(admin)/banners/banners-table";
import  BannerStats  from "@/components/(admin)/banners/banners-stats";
import  BannerAlerts  from "@/components/(admin)/banners/banners-alerts";

export default function ManageBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<BannerFormData>({
    title: "",
    deskripsi: "",
    image: "",
    urutan: 1,
    isActive: true,
  });

  // 🚀 Ambil semua banner
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/banners", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBanners(data);
    } catch {
      setError("Gagal memuat data banner");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🚀 Tambah / Update banner
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const method = editingBanner ? "PUT" : "POST";
      const url = editingBanner ? `/api/banners/${editingBanner.id}` : "/api/banners";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setSuccess(editingBanner ? "Banner berhasil diperbarui" : "Banner berhasil ditambahkan");
      await fetchBanners();
      resetForm();
      setIsDialogOpen(false);
    } catch {
      setError("Gagal menyimpan banner");
    } finally {
      setSubmitting(false);
    }
  };

  // 🚀 Edit banner
  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      deskripsi: banner.deskripsi,
      image: banner.image || "",
      urutan: banner.urutan,
      isActive: banner.isActive,
    });
    setIsDialogOpen(true);
  };

  // 🚀 Hapus banner
  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus banner ini?")) return;
    try {
      const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSuccess("Banner berhasil dihapus");
      await fetchBanners();
    } catch {
      setError("Gagal menghapus banner");
    }
  };

  // 🚀 Aktif/nonaktif banner
  const toggleStatus = async (banner: Banner) => {
    try {
      const res = await fetch(`/api/banners/${banner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
      });
      if (!res.ok) throw new Error();
      setSuccess(`Banner ${!banner.isActive ? "diaktifkan" : "dinonaktifkan"}`);
      await fetchBanners();
    } catch {
      setError("Gagal mengubah status banner");
    }
  };

  // Reset form ke kondisi awal
  const resetForm = () => {
    setFormData({
      title: "",
      deskripsi: "",
      image: "",
      urutan: 1,
      isActive: true,
    });
    setEditingBanner(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kelola Banner</h1>
          <p className="text-gray-600">Atur banner promosi dan informasi website</p>
        </div>
        <BannerDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} editingBanner={editingBanner} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} submitting={submitting} />
      </div>

      <BannerAlerts error={error} success={success} />
      <BannerStats banners={banners} />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Banner</CardTitle>
          <CardDescription>Kelola semua banner yang ditampilkan di website</CardDescription>
        </CardHeader>
        <CardContent>
          <BannerTable banners={banners} onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={toggleStatus} />
        </CardContent>
      </Card>
    </div>
  );
}
