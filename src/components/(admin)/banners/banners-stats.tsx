"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Banner } from "@/types";

export default function BannerStats({ banners }: { banners: Banner[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <p className="text-2xl font-bold">{banners.length}</p>
          <p className="text-xs text-muted-foreground">Total Banner</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <p className="text-2xl font-bold text-green-600">{banners.filter((b) => b.isActive).length}</p>
          <p className="text-xs text-muted-foreground">Banner Aktif</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <p className="text-2xl font-bold text-red-600">{banners.filter((b) => !b.isActive).length}</p>
          <p className="text-xs text-muted-foreground">Banner Nonaktif</p>
        </CardContent>
      </Card>
    </div>
  );
}
