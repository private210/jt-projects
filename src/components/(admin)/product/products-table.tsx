"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star, Package } from "lucide-react";
import { Product } from "@prisma/client";

export function ProductsTable({ products, onEdit, onDelete, onToggleFavorite, onAdd }: any) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Daftar Produk</CardTitle>
            <CardDescription>Kelola produk dan layanan</CardDescription>
          </div>
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Produk
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-10 w-10 mx-auto mb-2" />
            Tidak ada produk
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p: any) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {p.isFavorite && <Star className="h-4 w-4 text-yellow-500" />}
                      <span>{p.nama}</span>
                    </div>
                  </TableCell>
                  <TableCell>{p.deskripsi}</TableCell>
                  <TableCell>
                    {p.categories?.map((c: any) => (
                      <Badge key={c.id} variant="outline" className="text-xs mr-1">
                        {c.nama}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.isFavorite ? "default" : "secondary"}>{p.isFavorite ? "Favorit" : "Biasa"}</Badge>
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button size="sm" variant="outline" onClick={() => onToggleFavorite(p)}>
                      <Star className={`h-4 w-4 ${p.isFavorite ? "fill-yellow-400" : ""}`} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onEdit(p)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => onDelete(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
