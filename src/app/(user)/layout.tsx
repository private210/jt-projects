"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { SessionProvider } from "next-auth/react";
import { SiteSettingsProvider } from "@/app/contexts/SiteSettingsContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <SessionProvider>
        <SiteSettingsProvider>
        <Navbar />
        {children}
        <Footer />
        </SiteSettingsProvider>
        </SessionProvider>
      </main>
    </div>
  );
}
