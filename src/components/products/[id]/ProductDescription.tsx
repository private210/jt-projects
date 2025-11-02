"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProductSpec {
  id: string;
  deskripsi_spec: string;
  image?: string | null;
}

interface ProductOption {
  id: string;
  specs: ProductSpec[];
}

interface Product {
  deskripsi: string;
  options: ProductOption[];
}

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  // Ambil semua specs dari semua options
  const allSpecs = product.options.flatMap((opt) => opt.specs);

  return (
    <section className="space-y-6 text-center">
      {/* Deskripsi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deskripsi Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{product.deskripsi || "Deskripsi produk belum tersedia."}</p>
        </CardContent>
      </Card>

      {/* Spesifikasi */}
      {allSpecs && allSpecs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spesifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allSpecs.map((spec, idx) => (
                <div key={spec.id}>
                  <div className="text-sm">
                    <p className="text-gray-800 whitespace-pre-wrap">{spec.deskripsi_spec}</p>
                    {spec.image && (
                      <div className="mt-2 flex justify-center">
                        <Image src={spec.image} alt="Spesifikasi" width={300} height={200} className="rounded object-contain" />
                      </div>
                    )}
                  </div>
                  {idx < allSpecs.length - 1 && <Separator className="my-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
