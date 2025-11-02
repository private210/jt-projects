import { auth } from "@/lib/auth";
import ManageUsersClient from "@/components/(admin)/users/ManageUserClient";
import { redirect } from "next/navigation";

export default async function ManageUsersPage() {
  const session = await auth();

  const role = session?.user?.role ?? "";

  if (!session || !["DEVELOPER", "ADMIN", "EDITOR"].includes(role)) {
    redirect("/dashboard");
  }

  return (
    <div className="py-4">
      {/* <h2 className="text-2xl font-bold mb-6">Kelola Pengguna</h2> */}
      <ManageUsersClient />
    </div>
  );
}
