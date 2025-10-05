import BrandPartner from "@/components/about/brand-partner";
import HeroSectionAbout from "@/components/about/hero-sections";
import ContactSection from "@/components/about/contact-section";
import CTASection from "@/components/about/cta-section";

export default function AboutPage() {
    return (
        <div>
            <HeroSectionAbout/>
            <BrandPartner/>
            <ContactSection/>
            <CTASection/>
        </div>

    );
}