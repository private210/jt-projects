// app/products/[id]/page.tsx
import { products, Product } from "@/data/product";
import ProdukDetailClient from "@/components/products/[id]/ProdukDetailClient";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto py-28 px-4 text-center">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
      </div>
    );
  }

  return <ProdukDetailClient product={product} />;
}
