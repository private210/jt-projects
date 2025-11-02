"use client";
import { useEffect, useState } from "react";
import { Product, Category } from "@prisma/client";
import { ProductsStats } from "@/components/(admin)/product/products-stats";
import { ProductsDialog } from "@/components/(admin)/product/products-dialog";
import { ProductsTable } from "@/components/(admin)/product/products-table";
import { toast } from "sonner"; // ✅ Import dari Sonner

export default function ManageProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setProducts(Array.isArray(data) ? data : data.products ?? []);
    } catch {
      toast.error("Gagal memuat produk");
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
      toast.error("Gagal memuat kategori");
    }
  };

  // 🔹 Simpan produk (create/update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      toast.success(editingProduct ? "Produk berhasil diperbarui" : "Produk berhasil ditambahkan");
      setIsDialogOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat menyimpan produk");
    }
  };

  // 🔹 Reset form ke nilai awal
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
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
    toast.info("Produk berhasil dihapus");
  };

  // 🔹 Toggle produk favorite
  const toggleFavorite = async (product: Product) => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: !product.isFavorite }),
      });

      // Update tampilan lokal
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, isFavorite: !p.isFavorite } : p)));

      toast.success(!product.isFavorite ? "Produk ditambahkan ke favorit ⭐" : "Produk dihapus dari favorit");
    } catch {
      toast.error("Gagal memperbarui status favorit");
    }
  };

  return (
    <div className="space-y-6">
      <ProductsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} editingProduct={editingProduct} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} categories={categories} />

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
