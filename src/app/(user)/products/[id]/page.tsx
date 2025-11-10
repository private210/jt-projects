import ProductGallery from "@/components/products/[id]/ProductGallery";
import ProductInfo from "@/components/products/[id]/ProductInfo";
import ProductDescription from "@/components/products/[id]/ProductDescription";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import prisma from "@/lib/prisma";

// ✅ gunakan Promise<void> bukan ProductPageProps secara langsung
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProdukDetailPage(props: ProductPageProps) {
  const { id } = await props.params; // ✅ destructuring dari Promise
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      categories: true,
      images: { orderBy: { urutan: "asc" } },
      options: {
        include: {
          images: { orderBy: { urutan: "asc" } },
          specs: true,
        },
      },
    },
  });

  if (!product) {
    return (
      <div className="container mx-auto py-20 px-4 md:px-20">
        <p className="text-center text-red-600">Produk tidak ditemukan</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10 md:py-35 px-4 md:px-20">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 mt-8">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-10">
        <ProductDescription product={product} />
      </div>
    </section>
  );
}
