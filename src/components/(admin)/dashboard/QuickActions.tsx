import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, ShoppingBag, Users, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
      const quickActions = [
        {
          title: "Tambah Produk",
          description: "Tambahkan produk baru ke katalog",
          icon: Plus,
          href: "/admin/manage-products",
          color: "bg-blue-500",
        },
        {
          title: "Kelola Banner",
          description: "Atur banner untuk homepage",
          icon: Image,
          href: "/admin/manage-banners",
          color: "bg-green-500",
        },
        {
          title: "Kelola Kategori",
          description: "Organisir kategori produk",
          icon: ShoppingBag,
          href: "/admin/manage-categories",
          color: "bg-purple-500",
        },
        {
          title: "Kelola Pengguna",
          description: "Atur hak akses pengguna",
          icon: Users,
          href: "/admin/manage-users",
          color: "bg-orange-500",
        },
      ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>Akses fitur yang sering digunakan dengan cepat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50" onClick={() => (window.location.href = action.href)}>
                <div className={`p-2 rounded-full ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
}