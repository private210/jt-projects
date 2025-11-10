"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductGallery from "@/components/products/[id]/ProductGallery";
import ProductInfo from "@/components/products/[id]/ProductInfo";
import ProductDescription from "@/components/products/[id]/ProductDescription";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface ProductImage {
  id: string;
  imageUrl: string;
  urutan: number;
}

interface OptionImage {
  id: string;
  imageUrl: string;
  urutan: number;
}

interface ProductSpec {
  id: string;
  deskripsi_spec: string;
  image?: string | null;
}

interface ProductOption {
  id: string;
  warna: string;
  variant: string;
  hargaAsli: number;
  hargaJual: number;
  stock: number;
  images: OptionImage[];
  specs: ProductSpec[];
}

interface Category {
  id: string;
  nama: string;
}

interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  isFavorite: boolean;
  images: ProductImage[];
  options: ProductOption[];
  categories: Category[];
}

export default function ProdukDetailClient() {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setError("ID produk tidak valid");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Produk tidak ditemukan");
          }
          throw new Error("Gagal memuat produk");
        }

        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        // ✅ Perbaikan type-safe
        const message = err instanceof Error ? err.message : "Terjadi kesalahan tak terduga";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 md:px-20">
        <p className="text-center text-gray-600">Memuat produk...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-20 px-4 md:px-20">
        <p className="text-center text-red-600">{error || "Produk tidak ditemukan"}</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10 md:py-30 px-4 md:px-20">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Katalog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-red-600">{product.nama}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-10">
        <ProductDescription product={product} />
      </div>
    </section>
  );
}
