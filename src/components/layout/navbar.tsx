"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useUser(); // cek user login atau belum

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Katalog", href: "/products" },
    { name: "Hubungi Kami", href: "/contact" },
  ];

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Tutup menu saat klik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 p-6">
      <div className="container flex items-center justify-between text-center md:justify-between md:mx-auto lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo.JPG" alt="Logo" width={32} height={32} className="mr-2" />
          <div>
            <span className="text-xl font-bold">Joyo Tech ID</span>
            <p className="text-xs text-gray-400">Solusi Teknologi Terpercaya</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-center">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className={`text-sm font-medium ${pathname === item.href ? "text-red-600" : "text-gray-700 hover:text-red-600"}`}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Button Desktop */}
        <div className="hidden md:flex">
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="mr-2">
                <Button>Dashboard</Button>
              </Link>
              <SignOutButton>
                <Button variant="outline">Logout</Button>
              </SignOutButton>
              {/* Atau pakai UserButton biar ada menu profile */}
              {/* <UserButton afterSignOutUrl="/" /> */}
            </>
          ) : (
            <SignInButton mode="modal">
              <Button>Login Admin</Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div ref={menuRef} className="md:hidden mt-2 space-y-2 px-4 bg-white shadow-md rounded-md">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className={`block text-sm font-medium ${pathname === item.href ? "text-red-600" : "text-gray-700 hover:text-red-600"}`}>
              {item.name}
            </Link>
          ))}

          {/* Auth Button Mobile */}
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button className="w-full">Dashboard</Button>
              </Link>
              <SignOutButton>
                <Button className="w-full" variant="outline">
                  Logout
                </Button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full">Login Admin</Button>
            </SignInButton>
          )}
        </div>
      )}
    </nav>
  );
}
