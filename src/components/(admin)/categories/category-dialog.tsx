"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ✅ Definisikan tipe data brand partner
interface BrandPartner {
  id: string;
  nama: string;
}

// ✅ Definisikan tipe data form kategori
interface CategoryFormData {
  nama: string;
  brandPartnerIds: string[];
}

// ✅ Definisikan data awal kategori untuk edit
interface CategoryInitialData {
  id?: string;
  nama: string;
  brandPartners?: BrandPartner[];
}

// ✅ Props untuk komponen dialog
interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => Promise<void>;
  initialData?: CategoryInitialData;
  brands: BrandPartner[];
}

export function CategoryDialog({ open, onClose, onSave, initialData, brands }: CategoryDialogProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    nama: "",
    brandPartnerIds: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ nama?: string }>({});

  // ✅ Update form saat edit atau tambah baru
  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || "",
        brandPartnerIds: initialData.brandPartners?.map((b) => b.id) || [],
      });
    } else {
      setFormData({ nama: "", brandPartnerIds: [] });
    }
    setErrors({});
  }, [initialData, open]);

  const toggleSelect = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      brandPartnerIds: prev.brandPartnerIds.includes(id) ? prev.brandPartnerIds.filter((i) => i !== id) : [...prev.brandPartnerIds, id],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { nama?: string } = {};
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama kategori harus diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nama kategori */}
          <div className="space-y-2">
            <Label htmlFor="nama">
              Nama Kategori <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nama"
              value={formData.nama}
              onChange={(e) => {
                setFormData({ ...formData, nama: e.target.value });
                if (errors.nama) setErrors({ ...errors, nama: undefined });
              }}
              placeholder="Masukkan nama kategori"
              className={errors.nama ? "border-red-500" : ""}
            />
            {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
          </div>

          {/* Brand Partner Selection */}
          <div className="space-y-2">
            <Label>Brand Partner (Opsional)</Label>
            <div className="text-xs text-gray-500 mb-2">Pilih satu atau lebih brand partner</div>
            <Command className="border rounded-md">
              <CommandInput placeholder="Cari brand partner..." />
              <CommandList className="max-h-[200px]">
                <CommandEmpty>Tidak ada brand partner.</CommandEmpty>
                <CommandGroup>
                  {brands.map((b) => (
                    <CommandItem key={b.id} onSelect={() => toggleSelect(b.id)} className="cursor-pointer">
                      <div className={cn("mr-2 h-4 w-4 border border-primary rounded-sm flex items-center justify-center", formData.brandPartnerIds.includes(b.id) ? "bg-primary text-primary-foreground" : "bg-background")}>
                        {formData.brandPartnerIds.includes(b.id) && <Check className="h-3 w-3" />}
                      </div>
                      {b.nama}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            {formData.brandPartnerIds.length > 0 && <p className="text-xs text-gray-600 mt-1">{formData.brandPartnerIds.length} brand partner dipilih</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
