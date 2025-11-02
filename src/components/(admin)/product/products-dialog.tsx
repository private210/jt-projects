"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { ImageUploadInput } from "@/components/ui/image-upload-input";
import { Category } from "@prisma/client";
import { Trash2, Plus } from "lucide-react";

interface ProductsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: unknown;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  categories: Category[];
  submitting?: boolean;
}

export function ProductsDialog({ open, onOpenChange, editingProduct, formData, setFormData, onSubmit, categories, submitting = false }: ProductsDialogProps) {
  // ========= HANDLERS ==========
  const addOption = () => {
    setFormData({
      ...formData,
      options: [
        ...formData.options,
        {
          warna: "",
          variant: "",
          hargaAsli: 0,
          hargaJual: 0,
          stock: 0,
          images: [],
          specs: [],
        },
      ],
    });
  };

  const removeOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_: any, i: number) => i !== index),
    });
  };

  const updateOption = (index: number, field: string, value: any) => {
    const opts = [...formData.options];
    opts[index][field] = value;
    setFormData({ ...formData, options: opts });
  };

  const addSpec = (optIndex: number) => {
    const opts = [...formData.options];
    opts[optIndex].specs.push({ deskripsi_spec: "", image: "" });
    setFormData({ ...formData, options: opts });
  };

  const removeSpec = (optIndex: number, specIndex: number) => {
    const opts = [...formData.options];
    opts[optIndex].specs.splice(specIndex, 1);
    setFormData({ ...formData, options: opts });
  };

  const updateSpec = (optIndex: number, specIndex: number, field: string, value: string) => {
    const opts = [...formData.options];
    opts[optIndex].specs[specIndex][field] = value;
    setFormData({ ...formData, options: opts });
  };

  // ========= RENDER ==========
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] !w-full md:max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl">
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
                {categories.map((cat: Category) => (
                  <label key={cat.id} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.categoryIds.includes(cat.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData((prev: any) => ({
                          ...prev,
                          categoryIds: checked ? [...prev.categoryIds, cat.id] : prev.categoryIds.filter((id: string) => id !== cat.id),
                        }));
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
          <Card className="border rounded-xl shadow-sm">
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Varian Produk</CardTitle>
              <Button type="button" size="sm" onClick={addOption} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Varian
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {formData.options.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border">
                  <p className="text-base font-medium">Belum ada varian produk.</p>
                  <p className="text-sm mt-1">Klik tombol “Tambah Varian” untuk menambahkan.</p>
                </div>
              ) : (
                formData.options.map((opt: any, optIndex: number) => (
                  <Card key={optIndex} className="border rounded-lg shadow-sm bg-gray-50/40">
                    <CardHeader className="pb-3 border-b">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base font-semibold text-gray-700">
                          Varian #{optIndex + 1} {opt.warna && opt.variant ? ` - ${opt.warna} ${opt.variant}` : ""}
                        </CardTitle>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeOption(optIndex)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-6">
                      {/* Warna & Varian */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Warna</Label>
                          <Input placeholder="Contoh: Hitam" value={opt.warna} onChange={(e) => updateOption(optIndex, "warna", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Varian</Label>
                          <Input placeholder="Contoh: 256GB" value={opt.variant} onChange={(e) => updateOption(optIndex, "variant", e.target.value)} />
                        </div>
                      </div>

                      {/* Harga & Stok */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Harga Asli (Rp)</Label>
                          <Input type="number" placeholder="0" value={opt.hargaAsli} onChange={(e) => updateOption(optIndex, "hargaAsli", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Harga Jual (Rp)</Label>
                          <Input type="number" placeholder="0" value={opt.hargaJual} onChange={(e) => updateOption(optIndex, "hargaJual", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Stok</Label>
                          <Input type="number" placeholder="0" value={opt.stock} onChange={(e) => updateOption(optIndex, "stock", e.target.value)} />
                        </div>
                      </div>

                      {/* Gambar Varian */}
                      <Separator />
                      <div>
                        <Label className="font-medium">Gambar Varian</Label>
                        <MultiImageUpload images={opt.images} onChange={(images) => updateOption(optIndex, "images", images)} label="Upload atau masukkan URL gambar varian" />
                      </div>

                      {/* Spesifikasi */}
                      <Separator />
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <Label className="text-base font-semibold">Spesifikasi Detail</Label>
                          <Button type="button" size="sm" variant="outline" onClick={() => addSpec(optIndex)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Spesifikasi
                          </Button>
                        </div>

                        {opt.specs.length === 0 ? (
                          <div className="text-center py-4 text-sm text-gray-500 border rounded-lg bg-white">Belum ada spesifikasi</div>
                        ) : (
                          <div className="space-y-4">
                            {opt.specs.map((spec: any, specIndex: number) => (
                              <Card key={specIndex} className="bg-white border rounded-lg">
                                <CardContent className="pt-4 space-y-4">
                                  <div className="flex justify-between items-start">
                                    <Label className="text-sm font-medium">Spesifikasi #{specIndex + 1}</Label>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeSpec(optIndex, specIndex)}>
                                      <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                  </div>

                                  <Textarea
                                    placeholder="Deskripsi spesifikasi (Contoh: Layar: 6.7 inch Super Retina XDR)"
                                    value={spec.deskripsi_spec}
                                    onChange={(e) => updateSpec(optIndex, specIndex, "deskripsi_spec", e.target.value)}
                                    rows={3}
                                  />

                                  <ImageUploadInput label="Gambar Spesifikasi (Opsional)" value={spec.image || ""} onChange={(url) => updateSpec(optIndex, specIndex, "image", url)} placeholder="Upload atau URL gambar spesifikasi" />
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

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
