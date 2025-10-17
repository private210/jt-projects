import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import HeaderAdmin from "@/components/layout/headeradmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Konten Admin */}
      <main className="flex-1 pt-25">
        {/* Header */}
        <HeaderAdmin username="Davina" lastLogin="7/10/2025" />

        {/* Konten Utama */}
        <div className="container mx-auto px-6 py-6">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>

  );
}
