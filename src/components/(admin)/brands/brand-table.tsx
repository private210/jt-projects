import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { BrandPartner } from "@prisma/client";

interface BrandTableProps {
  brands: BrandPartner[];
  onEdit: (brand: BrandPartner) => void;
  onDelete: (id: string) => void;
}

export function BrandTable({ brands, onEdit, onDelete }: BrandTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Brand</TableHead>
          <TableHead>Gambar</TableHead>
          <TableHead>Dibuat</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand.id}>
            <TableCell>{brand.nama}</TableCell>
            <TableCell>
              {brand.image ? (
                <Image
                  src={brand.image}
                  alt={brand.nama}
                  className="w-12 h-12 object-cover rounded"
                  width={48}
                  height={48}
                />
              ) : (
                <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" />
                  </svg>
                </div>
              )}
            </TableCell>
            <TableCell>{new Date(brand.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(brand)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDelete(brand.id)} className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
