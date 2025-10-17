"use client";

import { Button } from "@/components/ui/button";

interface CategoryTableProps {
  categories: any[];
  onEdit: (cat: any) => void;
  onDelete: (id: string) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="py-3 px-4 border-b font-medium">Nama Kategori</th>
            <th className="py-3 px-4 border-b font-medium">Brand Partners</th>
            <th className="py-3 px-4 border-b font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-6 text-center text-muted-foreground">
                Belum ada kategori.
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 border-b">{cat.nama}</td>
                <td className="py-3 px-4 border-b">{cat.brandPartners?.length ? cat.brandPartners.map((b: any) => b.nama).join(", ") : "-"}</td>
                <td className="py-3 px-4 border-b text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(cat)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(cat.id)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
