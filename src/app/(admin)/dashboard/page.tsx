'use client';

import QuickActions from "@/components/(admin)/dashboard/QuickActions";
import Activity from "@/components/(admin)/dashboard/Activity";
import Overview from "@/components/(admin)/dashboard/Overview";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <Overview />
      <QuickActions />
      <Activity />
    </div>
  );
}