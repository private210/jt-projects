import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, Star, Layers, Tag } from "lucide-react";
import { Product, Category } from "@prisma/client";

export function ProductsStats({ products, categories }: { products: Product[]; categories: Category[] }) {
  const total = products.length;
  const fav = products.filter((p) => p.isFavorite).length;
  const categorized = products.filter((p) => (p as any).categories?.length > 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Produk</CardTitle>
        </CardHeader>
        <CardContent>{total}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Produk Favorit</CardTitle>
        </CardHeader>
        <CardContent>{fav}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Terkategorisasi</CardTitle>
        </CardHeader>
        <CardContent>{categorized}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Kategori Aktif</CardTitle>
        </CardHeader>
        <CardContent>{categories.length}</CardContent>
      </Card>
    </div>
  );
}
