import HeroSections from "@/components/home/hero-sections";
import BannersSections from "@/components/home/banners-sections";
import ProductSections from "@/components/home/product-sections";
import CTASections from "@/components/home/cta-sections";

export default function HomePage() {
  return (
    <div>
      <HeroSections />
      <BannersSections />
      <ProductSections/>
      <CTASections/>
    </div>
  );
}