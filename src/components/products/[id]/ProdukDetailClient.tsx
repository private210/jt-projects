"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/product";
import ProductGallery from "@/components/products/[id]/ProductGallery";
import ProductInfo from "@/components/products/[id]/ProductInfo";
import ProductDescription from "@/components/products/[id]/ProductDescription";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ProdukDetailClient() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p className="text-center py-20">Produk tidak ditemukan</p>;
  }

  return (
    <section className="container mx-auto py-30 px-20">
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
            <BreadcrumbPage className="text-joyo-red">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {/* Gambar Produk */}
        <ProductGallery product={product} />

        {/* Informasi Produk */}
        <ProductInfo product={product} />
      </div>
      <div className="mt-10">
        <ProductDescription product={product} />
      </div>
    </section>
  );
}
