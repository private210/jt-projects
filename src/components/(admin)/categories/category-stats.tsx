"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Users } from "lucide-react";

interface CategoryStatsProps {
  totalCategories: number;
  totalBrandPartners: number;
}

export function CategoryStats({ totalCategories, totalBrandPartners }: CategoryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCategories}</div>
          <p className="text-xs text-muted-foreground">Jumlah seluruh kategori</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Brand Partner</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBrandPartners}</div>
          <p className="text-xs text-muted-foreground">Terhubung dengan kategori</p>
        </CardContent>
      </Card>
    </div>
  );
}
