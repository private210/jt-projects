import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import QuickActions from "@/components/(admin)/dashboard/QuickActions";
import Activity from "@/components/(admin)/dashboard/Activity";
import Overview from "@/components/(admin)/dashboard/Overview";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Kalau belum login → arahkan ke halaman login
  if (!session) {
    redirect("/");
  }

  // Kalau sudah login, tampilkan dashboard
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard — Selamat datang {session.user?.name || "Admin"}</h2>
      <Overview />
      <QuickActions />
      <Activity />
    </div>
  );
}
