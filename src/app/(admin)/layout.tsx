import { AdminSidebar } from "@/components/(admin)/admin-sidebar";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <AdminSidebar />
      </div>
      <main className="md:pl-56 h-full">
        <div className="p-4 border-b flex justify-end">
          <UserButton afterSignOutUrl="/" />
        </div>
        {children}
      </main>
    </div>
  );
}
