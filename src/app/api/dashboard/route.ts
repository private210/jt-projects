// src/app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [users, products, banners, categories] = await Promise.all([prisma.user.findMany(), prisma.product.findMany(), prisma.banner.findMany(), prisma.category.findMany()]);

    const activeUsers = users.filter((u) => u.role === "admin").length;
    const activeBanners = banners.filter((b) => b.isActive).length;

    return NextResponse.json({
      totalUsers: users.length,
      totalProducts: products.length,
      totalBanners: banners.length,
      totalCategories: categories.length,
      activeUsers,
      activeBanners,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
