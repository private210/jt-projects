"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Banner } from "@/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";


interface BannerTableProps {
  banners: Banner[];
  onEdit: (banner: Banner) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (banner: Banner) => void;
}

export default function BannerTable({ banners, onEdit, onDelete, onToggleStatus }: BannerTableProps) {
  if (banners.length === 0) return <div className="text-center py-8 text-gray-500">Belum ada banner</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Urutan</TableHead>
          <TableHead>Judul</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Gambar</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Dibuat</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {banners.map((banner) => (
          <TableRow key={banner.id}>
            <TableCell>{banner.urutan}</TableCell>
            <TableCell>{banner.title}</TableCell>
            <TableCell className="max-w-xs truncate">{banner.deskripsi}</TableCell>
            <TableCell>
              {banner.image ? <Image src={banner.image} alt={banner.title} className="w-16 h-16 object-cover rounded" width={30} height={30} /> : <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded text-xs text-gray-500">No Image</div>}
            </TableCell>
            <TableCell>
              <Badge variant={banner.isActive ? "default" : "secondary"} className={banner.isActive ? "bg-green-500" : ""}>
                {banner.isActive ? "Aktif" : "Nonaktif"}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(banner.createdAt)}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => onToggleStatus(banner)}>
                  {banner.isActive ? "Nonaktifkan" : "Aktifkan"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(banner)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(banner.id)} className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
