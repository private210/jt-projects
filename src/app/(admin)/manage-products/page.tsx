"use client";
import { useEffect, useState } from "react";
import { Product, Category } from "@prisma/client";
import { ProductsStats } from "@/components/(admin)/product/products-stats";
import { ProductsDialog } from "@/components/(admin)/product/products-dialog";
import { ProductsTable } from "@/components/(admin)/product/products-table";
import { ProductsAlerts } from "@/components/(admin)/product/products-alerts";

export default function ManageProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✅ Default formData lengkap untuk menangani relasi image, option, dan spec
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    isFavorite: false,
    categoryIds: [] as string[],
    images: [] as string[],
    options: [
      {
        warna: "",
        variant: "",
        hargaAsli: 0,
        hargaJual: 0,
        stock: 0,
        images: [] as string[],
        specs: [{ deskripsi_spec: "", image: "" }],
      },
    ],
  });

  // 🔹 Load data awal
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // 🔹 Ambil semua produk
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();

      const productsArray = Array.isArray(data) ? data : data.products ?? [];
      setProducts(productsArray);
    } catch {
      setError("Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Ambil kategori
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const data = await res.json();
      setCategories(data);
    } catch {
      setError("Gagal memuat kategori");
    }
  };

  // 🔹 Simpan produk (create/update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan produk");

      await fetchProducts();
      setSuccess(editingProduct ? "Produk diperbarui" : "Produk ditambahkan");
      setIsDialogOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan produk");
    }
  };

  // 🔹 Reset form ke nilai default
  const resetForm = () => {
    setFormData({
      nama: "",
      deskripsi: "",
      isFavorite: false,
      categoryIds: [],
      images: [],
      options: [
        {
          warna: "",
          variant: "",
          hargaAsli: 0,
          hargaJual: 0,
          stock: 0,
          images: [],
          specs: [{ deskripsi_spec: "", image: "" }],
        },
      ],
    });
  };

  // 🔹 Edit produk
  const handleEdit = (product: any) => {
    setEditingProduct(product);

    setFormData({
      nama: product.nama || "",
      deskripsi: product.deskripsi || "",
      isFavorite: product.isFavorite || false,
      categoryIds: (product.categories || []).map((c: Category) => c.id),
      images: (product.images || []).map((img: any) => img.imageUrl) || [],
      options: (product.options || []).map((opt: any) => ({
        warna: opt.warna || "",
        variant: opt.variant || "",
        hargaAsli: opt.hargaAsli || 0,
        hargaJual: opt.hargaJual || 0,
        stock: opt.stock || 0,
        images: (opt.images || []).map((img: any) => img.imageUrl) || [],
        specs:
          (opt.specs || []).map((s: any) => ({
            deskripsi_spec: s.deskripsi_spec || "",
            image: s.image || "",
          })) || [],
      })),
    });

    setIsDialogOpen(true);
  };

  // 🔹 Hapus produk
  const handleDelete = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // 🔹 Toggle produk favorite
  const toggleFavorite = async (product: Product) => {
    await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, isFavorite: !product.isFavorite }),
    });
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <ProductsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} editingProduct={editingProduct} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} categories={categories} />

      <ProductsAlerts error={error} success={success} />
      <ProductsStats products={products} categories={categories} />

      <ProductsTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleFavorite={toggleFavorite}
        onAdd={() => {
          resetForm();
          setEditingProduct(null);
          setIsDialogOpen(true);
        }}
      />
    </div>
  );
}
