// app/contact/page.tsx
import MessageForm from "@/components/contact/MessageForm";
import ContactInfo from "@/components/contact/ContactInfo";
import LocationMap from "@/components/contact/LocationMap";
import SocialMedia from "@/components/contact/SocialMedia";

// ❌ Hapus "use client" di level page
// Halaman ini akan dirender di server untuk tampilan instan
export const dynamic = "force-static"; // memastikan pre-render tanpa loading

export default function ContactPage() {
  return (
    <section className="px-4 py-12 md:px-12 lg:px-24">
      {/* Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto mt-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Hubungi Kami</h1>
        <p className="text-gray-600 text-sm md:text-base">Silakan hubungi kami untuk informasi lebih lanjut atau kunjungi toko kami di Ponorogo</p>
      </div>

      {/* Layout 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kiri: Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <MessageForm />
        </div>

        {/* Kanan: Info, Lokasi, Sosmed */}
        <div className="space-y-6">
          <ContactInfo />
          <LocationMap />
          <SocialMedia />
        </div>
      </div>
    </section>
  );
}
