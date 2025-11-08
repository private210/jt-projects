"use client";
import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Star, Package } from "lucide-react";
import { toggleFavorite, deleteProducts } from "@/actions/products.action";
import { toast } from "sonner";
import { Product as PrismaProduct } from "@prisma/client";

type Category = {
  id: string;
  nama: string;
};

type Product = PrismaProduct & {
  categories?: Category[];
};

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: any) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
  onToggleFavorite: (product: Product) => Promise<void>;
}

export function ProductsTable({ products, onEdit, onDelete, onAdd }: ProductsTableProps) {
  const [localProducts, setLocalProducts] = useState<Product[]>(products ?? []);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  // ✅ Toggle favorit dengan toast
  const handleToggleFavorite = (id: string) => {
    // update tampilan lokal segera
    setLocalProducts((prev: Product[]) => prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)));

    // Jalankan pembaruan ke database di background
    startTransition(async () => {
      try {
        const updated = await toggleFavorite(id);

        // ✅ Tampilkan toast berdasarkan status baru
        const product = localProducts.find((p: Product) => p.id === id);
        const isNowFavorite = !product?.isFavorite;

        toast.success(isNowFavorite ? "Produk ditandai sebagai favorit ⭐" : "Produk dihapus dari favorit");
      } catch (err) {
        console.error(err);

        // rollback jika gagal
        setLocalProducts((prev: Product[]) => prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)));
        toast.error("Gagal memperbarui status favorit");
      }
    });
  };

  // ✅ Fungsi seleksi dan hapus seperti sebelumnya
  const handleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === localProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(localProducts.map((p) => p.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Hapus ${selectedIds.length} produk terpilih?`)) return;

    const remaining = localProducts.filter((p) => !selectedIds.includes(p.id));
    setLocalProducts(remaining);
    setSelectedIds([]);

    startTransition(async () => {
      try {
        await deleteProducts(selectedIds);
        toast.success("Produk terpilih berhasil dihapus");
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghapus produk");
      }
    });
  };

  const handleDeleteAll = () => {
    if (localProducts.length === 0) return;
    if (!confirm("Hapus SEMUA produk?")) return;

    setLocalProducts([]);
    setSelectedIds([]);

    startTransition(async () => {
      try {
        await deleteProducts(localProducts.map((p) => p.id));
        toast.success("Semua produk berhasil dihapus");
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghapus semua produk");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle>Daftar Produk</CardTitle>
            <CardDescription>Kelola produk dan layanan</CardDescription>
          </div>
          <div className="flex gap-2">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleDeleteSelected} disabled={isPending}>
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Terpilih
              </Button>
            )}
            {localProducts.length > 0 && (
              <Button variant="outline" onClick={handleDeleteAll} disabled={isPending}>
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Semua
              </Button>
            )}
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {localProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-10 w-10 mx-auto mb-2" />
            Tidak ada produk
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox checked={selectedIds.length === localProducts.length && localProducts.length > 0} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Checkbox checked={selectedIds.includes(p.id)} onCheckedChange={() => handleSelect(p.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {p.isFavorite && <Star className="h-4 w-4 text-yellow-500" />}
                      <span>{p.nama}</span>
                    </div>
                  </TableCell>
                  <TableCell>{p.deskripsi}</TableCell>
                  <TableCell>
                    {p.categories?.map((c: any) => (
                      <Badge key={c.id} variant="outline" className="text-xs mr-1">
                        {c.nama}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.isFavorite ? "default" : "secondary"}>{p.isFavorite ? "Favorit" : "Biasa"}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" disabled={isPending} onClick={() => handleToggleFavorite(p.id)}>
                      <Star className={`h-4 w-4 ${p.isFavorite ? "fill-yellow-400 text-yellow-500" : ""}`} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onEdit(p)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => onDelete(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
