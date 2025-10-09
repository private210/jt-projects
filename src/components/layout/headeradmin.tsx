"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGreeting } from "@/lib/utils"; // import greeting

interface HeaderAdminProps {
  username: string;
  lastLogin: string;
}

export default function HeaderAdmin({ username, lastLogin }: HeaderAdminProps) {
  const greeting = getGreeting();

  const tabs = [
    { value: "overview", label: "📊 Overview", link: "/dashboard" },
    { value: "produk", label: "📦 Produk", link: "/manage-products" },
    { value: "banner", label: "🖼️ Banner", link: "/manage-banners" },
    { value: "banner", label: "🖼️ Banner", link: "/manage-users" },
    { value: "banner", label: "🖼️ Banner", link: "/manage-home" },
    { value: "banner", label: "🖼️ Banner", link: "/manage-about" },
    { value: "banner", label: "🖼️ Banner", link: "/manage-contact" },
    { value: "banner", label: "🖼️ Banner", link: "/manage-website" },
  ];

  return (
    <header className="rounded-xl border shadow-sm">
      {/* Baris atas */}
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-2xl font-bold mt-1">Admin Dashboard</p>
          <p className="text-gray-600 mt-1">{greeting}, {username}!</p>
          <p className="text-gray-500 text-sm mt-2">
            Terakhir login: <span className="text-red-600">{lastLogin}</span>
          </p>
        </div>

        <div className="flex-shrink-0">
          <Image src="/assets/logo.png" alt="Logo Sekolah" width={100} height={100} className="object-contain" />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t px-6 py-2">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex w-full justify-start gap-x-4 overflow-x-auto bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                asChild
                className="relative px-3 py-2 rounded-md text-gray-600 transition-all 
                           hover:text-black 
                           data-[state=active]:bg-white 
                           data-[state=active]:text-black 
                           data-[state=active]:shadow-lg 
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
                <Link href={tab.link}>{tab.label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
