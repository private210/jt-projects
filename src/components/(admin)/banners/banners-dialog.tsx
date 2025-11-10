"use client";
import { FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUploadInput } from "@/components/ui/image-upload-input";
import { Banner, BannerFormData } from "@/types";
import { Minus, Plus } from "lucide-react";

interface BannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBanner: Banner | null;
  formData: BannerFormData;
  setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>;
  onSubmit: (e: FormEvent) => Promise<void>;
  submitting: boolean;
}

export default function BannerDialog({ open, onOpenChange, editingBanner, formData, setFormData, onSubmit, submitting }: BannerDialogProps) {
  // Fungsi untuk ubah urutan
  const handleUrutanChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      urutan: Math.max(1, (prev.urutan || 1) + delta), // tidak boleh kurang dari 1
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>Tambah Banner</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[600px]! max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle>{editingBanner ? "Edit Banner" : "Tambah Banner Baru"}</DialogTitle>
          <DialogDescription>{editingBanner ? "Perbarui informasi banner" : "Tambahkan banner baru untuk promosi"}</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Judul Banner */}
            <div className="space-y-2">
              <Label htmlFor="title">Judul Banner</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} placeholder="Masukkan judul banner" required />
            </div>

            {/* Urutan dengan tombol + dan - */}
            <div className="space-y-2">
              <Label htmlFor="urutan">Urutan</Label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button type="button" variant="ghost" className="px-3 py-2 hover:bg-gray-100" onClick={() => handleUrutanChange(-1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="urutan"
                  type="number"
                  className="w-full text-center border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={formData.urutan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      urutan: parseInt(e.target.value) || 1,
                    }))
                  }
                  min="1"
                  required
                />
                <Button type="button" variant="ghost" className="px-3 py-2 hover:bg-gray-100" onClick={() => handleUrutanChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deskripsi: e.target.value,
                }))
              }
              placeholder="Masukkan deskripsi banner"
              rows={3}
              required
            />
          </div>

          {/* Upload Gambar */}
          <ImageUploadInput label="Gambar Banner" value={formData.image ?? ""} onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))} placeholder="https://example.com/banner.jpg" />

          {/* Switch aktif */}
          <div className="flex items-center space-x-2">
            <Switch id="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))} />
            <Label htmlFor="isActive">Banner Aktif</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Menyimpan..." : editingBanner ? "Perbarui" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
