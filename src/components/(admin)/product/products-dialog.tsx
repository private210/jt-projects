"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Category } from "@prisma/client";

export function ProductsDialog({ open, onOpenChange, editingProduct, formData, setFormData, onSubmit, categories }: any) {
  // ========== HANDLERS ==========
  const addImage = () => setFormData({ ...formData, images: [...formData.images, ""] });
  const removeImage = (i: number) => setFormData({ ...formData, images: formData.images.filter((_, x) => x !== i) });

  const addOption = () =>
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

  const removeOption = (i: number) => setFormData({ ...formData, options: formData.options.filter((_: any, x: number) => x !== i) });

  const addOptionImage = (optIndex: number) => {
    const opts = [...formData.options];
    opts[optIndex].images.push("");
    setFormData({ ...formData, options: opts });
  };

  const removeOptionImage = (optIndex: number, imgIndex: number) => {
    const opts = [...formData.options];
    opts[optIndex].images = opts[optIndex].images.filter((_: any, i: number) => i !== imgIndex);
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

  // ========== RENDER ==========
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingProduct ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Nama & Deskripsi */}
          <div>
            <Label>Nama Produk</Label>
            <Input value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />
          </div>

          <div>
            <Label>Deskripsi</Label>
            <Textarea value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} required />
          </div>

          {/* Gambar Produk */}
          <div>
            <Label>Gambar Produk</Label>
            {formData.images.map((url: string, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  placeholder="URL gambar"
                  value={url}
                  onChange={(e) => {
                    const imgs = [...formData.images];
                    imgs[i] = e.target.value;
                    setFormData({ ...formData, images: imgs });
                  }}
                />
                <Button type="button" variant="ghost" onClick={() => removeImage(i)}>
                  Hapus
                </Button>
              </div>
            ))}
            <Button type="button" size="sm" onClick={addImage}>
              + Tambah Gambar
            </Button>
          </div>

          {/* Kategori */}
          <div>
            <Label>Kategori</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat: Category) => (
                <label key={cat.id} className="flex items-center space-x-2">
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
                  />
                  <span>{cat.nama}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Favorit */}
          <div className="flex items-center space-x-2">
            <Switch checked={formData.isFavorite} onCheckedChange={(checked) => setFormData({ ...formData, isFavorite: checked })} />
            <Label>Favorit</Label>
          </div>

          {/* OPTIONS */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Opsi Produk (Varian)</Label>
              <Button type="button" size="sm" onClick={addOption}>
                + Tambah Opsi
              </Button>
            </div>

            {formData.options.map((opt: any, optIndex: number) => (
              <div key={optIndex} className="p-3 border rounded-lg mb-3 bg-gray-50 space-y-3">
                <div className="flex justify-between items-center">
                  <strong>Opsi #{optIndex + 1}</strong>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeOption(optIndex)}>
                    Hapus
                  </Button>
                </div>

                <Input
                  placeholder="Warna"
                  value={opt.warna}
                  onChange={(e) => {
                    const opts = [...formData.options];
                    opts[optIndex].warna = e.target.value;
                    setFormData({ ...formData, options: opts });
                  }}
                />
                <Input
                  placeholder="Varian"
                  value={opt.variant}
                  onChange={(e) => {
                    const opts = [...formData.options];
                    opts[optIndex].variant = e.target.value;
                    setFormData({ ...formData, options: opts });
                  }}
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    placeholder="Harga Asli"
                    value={opt.hargaAsli}
                    onChange={(e) => {
                      const opts = [...formData.options];
                      opts[optIndex].hargaAsli = e.target.value;
                      setFormData({ ...formData, options: opts });
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Harga Jual"
                    value={opt.hargaJual}
                    onChange={(e) => {
                      const opts = [...formData.options];
                      opts[optIndex].hargaJual = e.target.value;
                      setFormData({ ...formData, options: opts });
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Stok"
                    value={opt.stock}
                    onChange={(e) => {
                      const opts = [...formData.options];
                      opts[optIndex].stock = e.target.value;
                      setFormData({ ...formData, options: opts });
                    }}
                  />
                </div>

                {/* Gambar per varian */}
                <div>
                  <Label>Gambar Varian</Label>
                  {opt.images.map((url: string, imgIndex: number) => (
                    <div key={imgIndex} className="flex gap-2 mb-2">
                      <Input
                        placeholder="URL gambar varian"
                        value={url}
                        onChange={(e) => {
                          const opts = [...formData.options];
                          opts[optIndex].images[imgIndex] = e.target.value;
                          setFormData({ ...formData, options: opts });
                        }}
                      />
                      <Button type="button" variant="ghost" onClick={() => removeOptionImage(optIndex, imgIndex)}>
                        Hapus
                      </Button>
                    </div>
                  ))}
                  <Button type="button" size="sm" onClick={() => addOptionImage(optIndex)}>
                    + Tambah Gambar Varian
                  </Button>
                </div>

                {/* Spesifikasi */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Spesifikasi</Label>
                    <Button type="button" size="sm" onClick={() => addSpec(optIndex)}>
                      + Tambah Spec
                    </Button>
                  </div>
                  {opt.specs.map((spec: any, specIndex: number) => (
                    <div key={specIndex} className="border rounded-md p-2 bg-white mb-2 space-y-2">
                      <Textarea
                        placeholder="Deskripsi Spesifikasi"
                        value={spec.deskripsi_spec}
                        onChange={(e) => {
                          const opts = [...formData.options];
                          opts[optIndex].specs[specIndex].deskripsi_spec = e.target.value;
                          setFormData({ ...formData, options: opts });
                        }}
                      />
                      <Input
                        placeholder="URL Gambar (opsional)"
                        value={spec.image}
                        onChange={(e) => {
                          const opts = [...formData.options];
                          opts[optIndex].specs[specIndex].image = e.target.value;
                          setFormData({ ...formData, options: opts });
                        }}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeSpec(optIndex, specIndex)}>
                        Hapus Spec
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">{editingProduct ? "Perbarui" : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
