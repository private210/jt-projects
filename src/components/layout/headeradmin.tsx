"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGreeting } from "@/lib/utils";

interface HeaderAdminProps {
  username: string;
  lastLogin: string;
}

export default function HeaderAdmin({ username, lastLogin }: HeaderAdminProps) {
  const greeting = getGreeting();
  const pathname = usePathname();

  // Definisikan menu langsung di sini
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
    { label: "Site Setting", value: "sitesetting", link: "/manage-sitesetting" },
  ];

  const [activeTab, setActiveTab] = useState<string>("overview");

  // Ambil tab aktif dari localStorage atau URL
  useEffect(() => {
    const saved = localStorage.getItem("activeTab");
    if (saved) {
      setActiveTab(saved);
    } else {
      const found = menuItems.find((item) => pathname.startsWith(item.link));
      if (found) setActiveTab(found.value);
    }
  }, [pathname]);

  // Simpan setiap kali tab berubah
  useEffect(() => {
    if (activeTab) localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <header className="rounded-xl border shadow-sm bg-white">
      {/* Header atas */}
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-2xl font-bold mt-1">Admin Dashboard</p>
          <p className="text-gray-600 mt-1">
            {greeting}, {username}!
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Terakhir login: <span className="text-red-600">{lastLogin}</span>
          </p>
        </div>

        <div className="flex-shrink-0">
          <Image src="/assets/logo.png" alt="Logo Sekolah" width={100} height={100} className="object-contain" />
        </div>
      </div>

      {/* Navbar Tabs */}
      <div className="border-t px-6 py-2 bg-gray-50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
