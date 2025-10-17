"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  initialData?: any;
  brands: any[];
}

export function CategoryDialog({ open, onClose, onSave, initialData, brands }: CategoryDialogProps) {
  const [formData, setFormData] = useState({
    nama: "",
    brandPartnerIds: [] as string[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || "",
        brandPartnerIds: initialData.brandPartners?.map((b: any) => b.id) || [],
      });
    }
  }, [initialData]);

  const toggleSelect = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      brandPartnerIds: prev.brandPartnerIds.includes(id) ? prev.brandPartnerIds.filter((i) => i !== id) : [...prev.brandPartnerIds, id],
    }));
  };

  const handleSubmit = async () => {
    await onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-4">Nama Kategori</Label>
            <Input value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="Masukkan nama kategori" />
          </div>

          <div>
            <Label className="mb-4">Pilih Brand Partner</Label>
            <Command className="border rounded-md">
              <CommandInput placeholder="Cari brand partner..." />
              <CommandList>
                <CommandEmpty>Tidak ada brand partner.</CommandEmpty>
                <CommandGroup>
                  {brands.map((b) => (
                    <CommandItem key={b.id} onSelect={() => toggleSelect(b.id)}>
                      <div className={cn("mr-2 h-4 w-4 border border-primary rounded-sm flex items-center justify-center", formData.brandPartnerIds.includes(b.id) ? "bg-primary text-primary-foreground" : "bg-background")}>
                        {formData.brandPartnerIds.includes(b.id) && <Check className="h-3 w-3" />}
                      </div>
                      {b.nama}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmit}>Simpan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
