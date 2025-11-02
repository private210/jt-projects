"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeaderAdmin from "@/components/layout/headeradmin";
import { SiteSettingsProvider } from "@/app/contexts/SiteSettingsContext";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SiteSettingsProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1 pt-25">
            <HeaderAdmin />
            <div className="container mx-auto px-6 py-6">
              {children}
              <Toaster richColors position="top-right" />
            </div>
          </main>
          <Footer />
        </div>
      </SiteSettingsProvider>
    </SessionProvider>
  );
}
