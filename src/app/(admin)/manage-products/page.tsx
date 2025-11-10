"use client";
import { useEffect, useState } from "react";
import { Product, Category } from "@prisma/client";
import { ProductsStats } from "@/components/(admin)/product/products-stats";
import { ProductsDialog } from "@/components/(admin)/product/products-dialog";
import { ProductsTable } from "@/components/(admin)/product/products-table";
import { toast } from "sonner";

// 🔹 Tipe Product lengkap dengan relasi
interface ProductWithRelations extends Product {
  categories?: Category[];
  images?: { imageUrl: string }[];
  options?: {
    warna: string;
    variant: string;
    hargaAsli: number;
    hargaJual: number;
    stock: number;
    images?: { imageUrl: string }[];
    specs?: { deskripsi_spec: string; image: string }[];
  }[];
}

// 🔹 Struktur data untuk form
interface ProductFormData {
  nama: string;
  deskripsi: string;
  isFavorite: boolean;
  categoryIds: string[];
  images: string[];
  options: {
    warna: string;
    variant: string;
    hargaAsli: number;
    hargaJual: number;
    stock: number;
    images: string[];
    specs: { deskripsi_spec: string; image: string }[];
  }[];
}

export default function ManageProduct() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
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

  // 🔹 Ambil data awal saat komponen mount
  useEffect(() => {
    void fetchProducts();
    void fetchCategories();
  }, []);

  // 🔹 Fetch semua produk
  const fetchProducts = async (): Promise<void> => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      const productsData = Array.isArray(data) ? data : data.products ?? [];
      setProducts(productsData);
    } catch {
      toast.error("Gagal memuat produk");
    }
  };

  // 🔹 Fetch kategori
  const fetchCategories = async (): Promise<void> => {
    try {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Gagal memuat kategori");
    }
  };

  // 🔹 Simpan produk (create/update)
 const handleSubmit = async (e: React.FormEvent<Element>): Promise<void> => {
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
   } catch (err) {
     const message = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan produk";
     toast.error(message);
   }
 };



  // 🔹 Reset form
  const resetForm = (): void => {
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
  const handleEdit = (product: ProductWithRelations): void => {
    setEditingProduct(product);
    setFormData({
      nama: product.nama || "",
      deskripsi: product.deskripsi || "",
      isFavorite: product.isFavorite || false,
      categoryIds: (product.categories || []).map((c) => c.id),
      images: (product.images || []).map((img) => img.imageUrl),
      options: (product.options || []).map((opt) => ({
        warna: opt.warna || "",
        variant: opt.variant || "",
        hargaAsli: opt.hargaAsli || 0,
        hargaJual: opt.hargaJual || 0,
        stock: opt.stock || 0,
        images: (opt.images || []).map((img) => img.imageUrl),
        specs: (opt.specs || []).map((s) => ({
          deskripsi_spec: s.deskripsi_spec || "",
          image: s.image || "",
        })),
      })),
    });
    setIsDialogOpen(true);
  };

  // 🔹 Hapus produk
  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await fetchProducts();
    toast.info("Produk berhasil dihapus");
  };

  // 🔹 Toggle favorit
  const toggleFavorite = async (product: Product): Promise<void> => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: !product.isFavorite }),
      });

      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, isFavorite: !p.isFavorite } : p)));

      toast.success(!product.isFavorite ? "Produk ditambahkan ke favorit ⭐" : "Produk dihapus dari favorit");
    } catch {
      toast.error("Gagal memperbarui status favorit");
    }
  };

  return (
    <div className="space-y-6">
      {/* 🔸 Perbaikan di sini: kita bungkus handleSubmit agar tidak return Promise langsung */}
      <ProductsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        onSubmit={(e) => void handleSubmit(e)} // ✅ tidak error lagi
        categories={categories}
      />

      <ProductsStats products={products} categories={categories} />

      <ProductsTable
        products={products}
        onEdit={(product) => handleEdit(product as ProductWithRelations)} // ✅ cast tipe
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
