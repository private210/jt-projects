"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUploadInput } from "@/components/ui/image-upload-input";

interface BrandDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  formData: { nama: string; image: string };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
  submitting: boolean;
}

export function BrandDialog({ open, onOpenChange, formData, setFormData, onSubmit, isEditing, submitting }: BrandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Brand" : "Tambah Brand Baru"}</DialogTitle>
          <DialogDescription>{isEditing ? "Perbarui informasi brand partner." : "Tambahkan brand partner baru."}</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label className="mb-4">Nama Brand</Label>
            <Input value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="Masukkan nama brand" required />
          </div>
          {/* Menggunakan ImageUploadInput */}
          <ImageUploadInput label="Gambar Banner" value={formData.image} onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))} placeholder="https://example.com/banner.jpg" />


          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Menyimpan..." : isEditing ? "Perbarui" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
