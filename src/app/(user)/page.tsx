import HeroSections from "@/components/home/hero-sections";
import BannersSections from "@/components/home/banners-sections";
import ProductSections from "@/components/home/product-sections";
import CTASections from "@/components/home/cta-sections";
import FAQSection from "@/components/home/FAQ-sections";
import DynamicMetadata from "@/components/layout/DynamicMetadatas";

export default function HomePage() {
  return (
    <div>
      <DynamicMetadata pageTitle="Home" pageDescription="Temukan berbagai produk teknologi terbaik di Joyo Tech ID" />
      <HeroSections />
      <BannersSections />
      <ProductSections />
      <FAQSection />
      <CTASections />
    </div>
  );
}