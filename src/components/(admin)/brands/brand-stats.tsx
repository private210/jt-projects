import { Card, CardContent } from "@/components/ui/card";
import { Users, Tag } from "lucide-react";
import { BrandPartner } from "@prisma/client";

export function BrandStats({ brands }: { brands: BrandPartner[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{brands.length}</p>
              <p className="text-sm text-muted-foreground">Total Brand Partner</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Tag className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Kategori Terhubung</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
