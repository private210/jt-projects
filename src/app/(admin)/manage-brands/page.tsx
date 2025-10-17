"use client";

import { useEffect, useState } from "react";
import { BrandPartner } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BrandDialog } from "@/components/(admin)/brands/brand-dialog";
import { BrandTable } from "@/components/(admin)/brands/brand-table";
import { BrandStats } from "@/components/(admin)/brands/brand-stats";
import { BrandAlerts } from "@/components/(admin)/brands/brand-alerts";

export default function ManageBrands() {
  const [brands, setBrands] = useState<BrandPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingBrand, setEditingBrand] = useState<BrandPartner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({ nama: "", image: "" });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/brands", { cache: "no-store" });
      const data = await res.json();
      setBrands(data);
    } catch {
      setError("Gagal memuat data brand");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const method = editingBrand ? "PUT" : "POST";
      const url = editingBrand ? `/api/brands/${editingBrand.id}` : "/api/brands";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchBrands();
        setSuccess(editingBrand ? "Brand diperbarui" : "Brand ditambahkan");
        setIsDialogOpen(false);
        setEditingBrand(null);
        setFormData({ nama: "", image: "" });
      } else {
        setError("Gagal menyimpan brand");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (brand: BrandPartner) => {
    setEditingBrand(brand);
    setFormData({ nama: brand.nama, image: brand.image ?? "" });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus brand ini?")) return;
    await fetch(`/api/brands/${id}`, { method: "DELETE" });
    fetchBrands();
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Brand Partner</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Tambah Brand
        </Button>
      </div>

      <BrandAlerts error={error} success={success} />
      <BrandStats brands={brands} />
      <BrandTable brands={brands} onEdit={handleEdit} onDelete={handleDelete} />

      <BrandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={!!editingBrand} submitting={submitting} />
    </div>
  );
}
