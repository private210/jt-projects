"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryDialog } from "@/components/(admin)/categories/category-dialog";
import { CategoryTable } from "@/components/(admin)/categories/category-table";
import { CategoryStats } from "@/components/(admin)/categories/category-stats";
import { CategoryAlert } from "@/components/(admin)/categories/category-alerts";

export default function ManageCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [alert, setAlert] = useState<any | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
  }

  async function fetchBrands() {
    const res = await fetch("/api/brands");
    const data = await res.json();
    setBrands(Array.isArray(data) ? data : []);
  }

  const handleSave = async (data: any) => {
    try {
      const method = editData ? "PUT" : "POST";
      await fetch("/api/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData ? { ...data, id: editData.id } : data),
      });
      setAlert({ type: "success", title: "Berhasil", message: "Kategori disimpan!" });
      fetchCategories();
    } catch {
      setAlert({ type: "error", title: "Gagal", message: "Terjadi kesalahan saat menyimpan." });
    } finally {
      setEditData(null);
      setOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus kategori ini?")) return;
    try {
      await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setAlert({ type: "success", title: "Dihapus", message: "Kategori berhasil dihapus!" });
      fetchCategories();
    } catch {
      setAlert({ type: "error", title: "Gagal", message: "Tidak dapat menghapus kategori." });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Kategori</h1>
        <Button onClick={() => setOpen(true)}>Tambah Kategori</Button>
      </div>

      {alert && <CategoryAlert type={alert.type} title={alert.title} message={alert.message} />}

      <CategoryStats totalCategories={categories.length} totalBrandPartners={categories.reduce((sum, cat) => sum + (cat.brandPartners?.length || 0), 0)} />

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
