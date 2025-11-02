"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGreeting } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface SiteSetting {
  logo: string | null;
  nama_company: string;
}

export default function HeaderAdmin() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const greeting = getGreeting();

  const [siteSetting, setSiteSetting] = useState<SiteSetting | null>(null);

  const username = session?.user?.name ?? "Pengguna";
  const role = session?.user?.role ?? "Tamu";
  const email = session?.user?.email ?? "Tamu";

  // === Fetch data site setting ===
  useEffect(() => {
    const fetchSiteSetting = async () => {
      try {
        const res = await fetch("/api/site-settings");
        const data = await res.json();
        setSiteSetting(data);
      } catch (error) {
        console.error("Gagal mengambil data site settings:", error);
      }
    };
    fetchSiteSetting();
  }, []);

  // === Semua menu admin ===
  const menuItems = [
    { label: "Overview", value: "overview", link: "/dashboard" },
    { label: "Produk", value: "products", link: "/manage-products" },
    { label: "Kategori", value: "categories", link: "/manage-categories" },
    { label: "Banner", value: "banners", link: "/manage-banners" },
    { label: "Brand", value: "brands", link: "/manage-brands" },
    { label: "Kontak", value: "contact", link: "/manage-contact" },
    { label: "Pengguna", value: "users", link: "/manage-users" },
    { label: "Home", value: "home", link: "/manage-home" },
    { label: "About", value: "about", link: "/manage-about" },
    { label: "FAQ", value: "faq", link: "/manage-FAQ" },
    { label: "Site Setting", value: "sitesetting", link: "/manage-sitesetting" },
  ];

  // Tentukan tab aktif berdasarkan URL
  const activeTab = menuItems.find((item) => pathname.startsWith(item.link))?.value || "overview";

  // === Fallback logo jika belum diatur ===
  const logoUrl = siteSetting?.logo || "/assets/logo.JPG";

  if (status === "loading") {
    return <header className="rounded-xl border shadow-sm bg-white animate-pulse p-6 text-gray-400">Memuat data user...</header>;
  }

  return (
    <header className="rounded-xl border shadow-sm bg-white">
      {/* Header atas */}
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-2xl font-bold mt-1">Admin Dashboard</p>
          <p className="text-gray-600 mt-1">
            {greeting}, <span className="font-semibold">{username}</span>!
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Anda login sebagai <span className="text-red-600 font-semibold">{role}</span> | Dengan email : <span className="text-gray-700">{email}</span>
          </p>
        </div>

        {/* === Logo Perusahaan === */}
        <div className="flex-shrink-0">
          <Image src={logoUrl} alt="Logo" width={100} height={100} className="object-contain rounded-md" priority />
        </div>
      </div>

      {/* Tabs Navigasi */}
      <div className="border-t px-6 py-2 bg-gray-50">
        <Tabs value={activeTab} className="w-full">
          <TabsList className="flex w-full justify-start gap-x-4 overflow-x-auto bg-transparent">
            {menuItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                asChild
                className="relative px-3 py-2 rounded-md text-gray-600 transition-all
                  hover:text-black
                  data-[state=active]:bg-white 
                  data-[state=active]:text-black 
                  data-[state=active]:shadow-md 
                  data-[state=active]:border 
                  data-[state=active]:border-gray-200 
                  data-[state=active]:after:content-[''] 
                  data-[state=active]:after:absolute 
                  data-[state=active]:after:bottom-0 
                  data-[state=active]:after:left-0 
                  data-[state=active]:after:h-[2px] 
                  data-[state=active]:after:w-full 
                  data-[state=active]:after:bg-red-600"
              >
                <Link href={item.link}>{item.label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
