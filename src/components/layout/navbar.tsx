"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import LoginModal from "@/components/(auth)/LoginModal";
import { useSiteSettings } from "@/app/contexts/SiteSettingsContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { settings, loading } = useSiteSettings();
  const isSignedIn = !!session;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Katalog", href: "/products" },
    { name: "Hubungi Kami", href: "/contact" },
  ];

  // Tutup menu jika pindah halaman
  useEffect(() => setIsOpen(false), [pathname]);

  // Tutup menu jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Default jika settings belum siap
  const logoUrl = settings?.logo || "/assets/logo.JPG";
  const companyName = settings?.nama_company || "Joyo Tech ID";

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 p-4 lg:p-6">
      <div className="container flex items-center justify-between mx-auto px-2 lg:px-16">
        {/* === Logo === */}
        <Link href="/" className="flex items-center">
          {loading ? (
            <div className="animate-pulse flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded mr-2"></div>
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              <Image src={logoUrl} alt="Logo" width={60} height={60} className="mr-3 object-contain" />
              <div className="leading-tight">
                <span className="text-lg font-bold">{companyName}</span>
                <p className="text-xs text-gray-400">Solusi Teknologi Terpercaya</p>
              </div>
            </>
          )}
        </Link>

        {/* === Desktop Menu === */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className={`text-sm font-medium transition-colors ${pathname === item.href ? "text-red-600" : "text-gray-700 hover:text-red-600"}`}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* === Desktop Auth Buttons === */}
        <div className="hidden lg:flex items-center gap-3">
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowLoginModal(true)} className="bg-red-600 hover:bg-red-700 text-white">
              Login Admin
            </Button>
          )}
        </div>

        {/* === Mobile / Tablet Hamburger Button === */}
        <button onClick={toggleMenu} className="lg:hidden text-gray-700 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* === Mobile Dropdown Menu === */}
      <div ref={menuRef} className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
        <div className="bg-white shadow-md rounded-lg mx-4 px-4 py-4 space-y-3">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className={`block text-sm font-medium ${pathname === item.href ? "text-red-600" : "text-gray-700 hover:text-red-600"}`}>
              {item.name}
            </Link>
          ))}

          {/* Tombol Auth di dalam hamburger */}
          <div className="border-t border-gray-200 pt-3 space-y-2">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Dashboard</Button>
                </Link>
                <Button className="w-full" variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                  Logout
                </Button>
              </>
            ) : (
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowLoginModal(true)}>
                Login Admin
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* === Modal Login === */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
}
