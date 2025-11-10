"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { Category } from "@prisma/client";
import { FormEvent } from "react";

/* ======== TYPES ======== */
export interface ProductSpec {
  deskripsi_spec: string;
  image: string;
}

export interface ProductOption {
  warna: string;
  variant: string;
  hargaAsli: number;
  hargaJual: number;
  stock: number;
  images: string[];
  specs: ProductSpec[];
}

export interface ProductFormData {
  nama: string;
  deskripsi: string;
  isFavorite: boolean;
  categoryIds: string[];
  images: string[];
  options: ProductOption[];
}

interface ProductsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: unknown;
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  categories: Category[];
  submitting?: boolean;
}

/* ======== COMPONENT ======== */
export function ProductsDialog({ open, onOpenChange, editingProduct, formData, setFormData, onSubmit, categories, submitting = false }: ProductsDialogProps) {
  // ========= HANDLERS ==========
  // const addOption = () => {
  //   setFormData({
  //     ...formData,
  //     options: [
  //       ...formData.options,
  //       {
  //         warna: "",
  //         variant: "",
  //         hargaAsli: 0,
  //         hargaJual: 0,
  //         stock: 0,
  //         images: [],
  //         specs: [],
  //       },
  //     ],
  //   });
  // };

  // const removeOption = (index: number) => {
  //   setFormData({
  //     ...formData,
  //     options: formData.options.filter((_, i) => i !== index),
  //   });
  // };

  // const updateOption = <K extends keyof ProductOption>(index: number, field: K, value: ProductOption[K]) => {
  //   const opts = [...formData.options];
  //   opts[index][field] = value;
  //   setFormData({ ...formData, options: opts });
  // };

  // const addSpec = (optIndex: number) => {
  //   const opts = [...formData.options];
  //   opts[optIndex].specs.push({ deskripsi_spec: "", image: "" });
  //   setFormData({ ...formData, options: opts });
  // };

  // const removeSpec = (optIndex: number, specIndex: number) => {
  //   const opts = [...formData.options];
  //   opts[optIndex].specs.splice(specIndex, 1);
  //   setFormData({ ...formData, options: opts });
  // };

  // const updateSpec = <K extends keyof ProductSpec>(optIndex: number, specIndex: number, field: K, value: ProductSpec[K]) => {
  //   const opts = [...formData.options];
  //   opts[optIndex].specs[specIndex][field] = value;
  //   setFormData({ ...formData, options: opts });
  // };

  // ========= RENDER ==========
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full! md:max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold tracking-tight">{editingProduct ? "Edit Produk" : "Tambah Produk Baru"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-8 py-4">
          {/* === INFORMASI DASAR === */}
          <Card className="border rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Produk *</Label>
                <Input id="nama" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="Contoh: iPhone 15 Pro Max" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi Produk *</Label>
                <Textarea id="deskripsi" value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} placeholder="Jelaskan detail produk..." rows={4} required />
              </div>

              <div className="flex items-center space-x-3">
                <Switch id="isFavorite" checked={formData.isFavorite} onCheckedChange={(checked) => setFormData({ ...formData, isFavorite: checked })} />
                <Label htmlFor="isFavorite" className="cursor-pointer">
                  Tandai sebagai Produk Favorit
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* === KATEGORI === */}
          <Card className="border rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Kategori Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.categoryIds.includes(cat.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData({
                          ...formData,
                          categoryIds: checked ? [...formData.categoryIds, cat.id] : formData.categoryIds.filter((id) => id !== cat.id),
                        });
                      }}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">{cat.nama}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* === GAMBAR PRODUK === */}
          <Card className="border rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Gambar Produk Utama</CardTitle>
            </CardHeader>
            <CardContent>
              <MultiImageUpload images={formData.images} onChange={(images) => setFormData({ ...formData, images })} label="Upload atau masukkan URL gambar produk" />
            </CardContent>
          </Card>

          {/* === VARIAN PRODUK === */}
          {/* (bagian varian dan spesifikasi tetap sama seperti kode kamu) */}

          {/* === FOOTER === */}
          <DialogFooter className="gap-2 pt-2 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Batal
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Menyimpan..." : editingProduct ? "Perbarui Produk" : "Simpan Produk"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
