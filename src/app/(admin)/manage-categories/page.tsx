"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryDialog } from "@/components/(admin)/categories/category-dialog";
import { CategoryTable } from "@/components/(admin)/categories/category-table";
import { CategoryStats } from "@/components/(admin)/categories/category-stats";
import { CategoryAlert } from "@/components/(admin)/categories/category-alerts";
import { Loader2, Plus } from "lucide-react";

export default function ManageCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [alert, setAlert] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  async function fetchData() {
    setLoading(true);
    try {
      await Promise.all([fetchCategories(), fetchBrands()]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({
        type: "error",
        title: "Gagal Memuat Data",
        message: "Terjadi kesalahan saat memuat data",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async function fetchBrands() {
    try {
      const res = await fetch("/api/brands");
      if (!res.ok) throw new Error("Failed to fetch brands");
      const data = await res.json();
      setBrands(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }

  const handleSave = async (data: any) => {
    try {
      const method = editData ? "PUT" : "POST";
      const payload = editData ? { ...data, id: editData.id } : data;

      const res = await fetch("/api/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setAlert({
          type: "error",
          title: "Gagal Menyimpan",
          message: result.error || "Terjadi kesalahan saat menyimpan kategori",
        });
        return;
      }

      setAlert({
        type: "success",
        title: "Berhasil",
        message: editData ? "Kategori berhasil diperbarui!" : "Kategori berhasil ditambahkan!",
      });

      await fetchCategories();
      setEditData(null);
      setOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
      setAlert({
        type: "error",
        title: "Gagal",
        message: "Terjadi kesalahan saat menyimpan kategori",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;

    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (!res.ok) {
        setAlert({
          type: "error",
          title: "Gagal Menghapus",
          message: result.error || "Terjadi kesalahan saat menghapus kategori",
        });
        return;
      }

      setAlert({
        type: "success",
        title: "Dihapus",
        message: "Kategori berhasil dihapus!",
      });

      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setAlert({
        type: "error",
        title: "Gagal",
        message: "Tidak dapat menghapus kategori",
      });
    }
  };

  const totalBrandPartners = categories.reduce((sum, cat) => sum + (cat.brandPartners?.length || 0), 0);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Kategori</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola kategori produk dan brand partner</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      {alert && <CategoryAlert type={alert.type} title={alert.title} message={alert.message} />}

      <CategoryStats totalCategories={categories.length} totalBrandPartners={totalBrandPartners} />

      <CategoryTable
        categories={categories}
        onEdit={(cat) => {
          setEditData(cat);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      {open && (
        <CategoryDialog
          open={open}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
          initialData={editData}
          brands={brands}
        />
      )}
    </div>
  );
}
