import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

/**
 * Ambil session user (fungsi pengganti Clerk's auth)
 */
export async function auth() {
  return await getServerSession(authOptions);
}

/**
 * Ambil data user yang sedang login dari database
 */
export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
}

/**
 * Pastikan user sudah login
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: Anda harus login terlebih dahulu");
  return user;
}

/**
 * Pastikan user adalah admin
 */
export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") throw new Error("Forbidden: Anda tidak memiliki akses admin");
  return user;
}
