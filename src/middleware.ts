import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;

  // Jika tidak login â†’ redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = token.role;

  // âœ… Admin & Developer bisa akses semua halaman admin
  if (role === "ADMIN" || role === "DEVELOPER") {
    return NextResponse.next();
  }

  // âœ… Editor hanya boleh akses produk & banner
  if (role === "EDITOR") {
    const allowed = ["/manage-products", "/manage-banners", "/dashboard"];
    if (!allowed.some((p) => path.startsWith(p))) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // âŒ User lain (Guest, Customer, dsb)
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/(dashboard|manage-about|manage-banners|manage-brands|manage-categories|manage-contact|manage-home|manage-products|manage-sitesetting|manage-users)/:path*"],
};
