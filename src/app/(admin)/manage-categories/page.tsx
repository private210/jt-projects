"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryDialog } from "@/components/(admin)/categories/category-dialog";
import { CategoryTable } from "@/components/(admin)/categories/category-table";
import { toast } from "sonner";
import { Category, BrandPartner, CategoryFormData, CategoryInitialData } from "@/types/category";

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<BrandPartner[]>([]);
  const [editData, setEditData] = useState<CategoryInitialData | undefined>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data kategori & brand partner
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, brandRes] = await Promise.all([fetch("/api/categories"), fetch("/api/brands")]);

        if (!catRes.ok || !brandRes.ok) {
          throw new Error("Gagal memuat data kategori atau brand");
        }

        const catData: Category[] = await catRes.json();
        const brandData: BrandPartner[] = await brandRes.json();

        setCategories(catData);
        setBrands(brandData);
      } catch (err) {
        console.error(err);
        toast.error("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 🔹 Simpan atau perbarui kategori
  const handleSave = async (data: CategoryFormData) => {
    try {
      const payload = editData ? { ...data, id: editData.id } : data;

      const res = await fetch(`/api/categories${editData ? `/${editData.id}` : ""}`, {
        method: editData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan kategori");

      toast.success(`Kategori berhasil ${editData ? "diperbarui" : "ditambahkan"}`);
      setOpen(false);
      setEditData(undefined);

      // 🔄 Refresh data kategori
      const newData = await fetch("/api/categories").then((r) => r.json());
      setCategories(newData);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan kategori");
    }
  };

  // 🔹 Hapus kategori
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus kategori");

      toast.success("Kategori berhasil dihapus");
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus kategori");
    }
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Memuat data kategori...</p>
      </div>
    );
  }

  return (
    <section className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
        <Button
          onClick={() => {
            setEditData(undefined);
            setOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Kategori
        </Button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={(cat) => {
         setEditData({
           id: cat.id,
           nama: cat.nama,
           brandPartners: cat.brands,
         });

          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      {open && (
        <CategoryDialog
          open={open}
          onClose={() => {
            setOpen(false);
            setEditData(undefined);
          }}
          onSave={handleSave}
          initialData={editData}
          brands={brands}
        />
      )}
    </section>
  );
}
