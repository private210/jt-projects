"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/data/product";

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <section className="space-y-6 text-center">
      {/* Deskripsi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deskripsi Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{product.description || "Deskripsi produk belum tersedia."}</p>
        </CardContent>
      </Card>
      {/* Spesifikasi */}
      {product.specs && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spesifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(product.specs).map(([key, value], idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">{key}</span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                  {idx < Object.keys(product.specs!).length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
