"use client";
import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Banner, BannerFormData } from "@/types";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>Tambah Banner</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingBanner ? "Edit Banner" : "Tambah Banner Baru"}</DialogTitle>
          <DialogDescription>{editingBanner ? "Perbarui informasi banner" : "Tambahkan banner baru untuk promosi"}</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Banner</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} placeholder="Masukkan judul banner" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urutan">Urutan</Label>
              <Input id="urutan" type="number" min="1" value={formData.urutan} onChange={(e) => setFormData((prev) => ({ ...prev, urutan: parseInt(e.target.value) || 1 }))} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea id="deskripsi" value={formData.deskripsi} onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))} placeholder="Masukkan deskripsi banner" rows={3} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL Gambar</Label>
            <Input id="image" type="url" value={formData.image} onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))} placeholder="https://example.com/banner.jpg" />
          </div>

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
