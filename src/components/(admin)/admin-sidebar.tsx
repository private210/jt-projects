"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Package, Settings, Camera, Mail, Globe, FileText, Shield, Contact, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: " /dashboard",
  },
  {
    label: "Manage Products",
    icon: Package,
    href: " /manage-products",
  },
  {
    label: "Manage Services",
    icon: Settings,
    href: " /manage-services",
  },
  {
    label: "Manage Banners",
    icon: Camera,
    href: " /manage-banners",
  },
  {
    label: "Manage Users",
    icon: Users,
    href: " /manage-users",
  },
  {
    label: "Manage About",
    icon: FileText,
    href: " /manage-about",
  },
  {
    label: "Manage Contact",
    icon: Contact,
    href: " /manage-contact",
  },
  {
    label: "Manage Social",
    icon: Globe,
    href: " /manage-social",
  },
  {
    label: "Manage Home",
    icon: Layout,
    href: " /manage-home",
  },
  {
    label: "Manage Website",
    icon: Shield,
    href: " /manage-website",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-black text-white">
      <div className="px-3 py-2 flex-1">
        <Link href=" /dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">JT</span>
            </div>
          </div>
          <h1 className="text-xl font-bold">Joyo Tech ID</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-red-600 rounded-lg transition", pathname === route.href ? "text-white bg-red-600" : "text-zinc-400")}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-white" : "text-zinc-400")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
