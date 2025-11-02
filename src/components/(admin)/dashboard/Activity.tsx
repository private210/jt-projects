"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityLog {
  id: number;
  action: string;
  entity?: string;
  user?: string;
  createdAt: string;
}

export default function Activity() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    fetch("/api/activity")
      .then((res) => res.json())
      .then(setLogs)
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Perubahan terbaru pada sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada aktivitas.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString("id-ID")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status Sistem</CardTitle>
          <CardDescription>Kondisi sistem saat ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge className="bg-green-500">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Server</span>
              <Badge className="bg-green-500">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Service</span>
              <Badge variant="secondary">Maintenance</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
