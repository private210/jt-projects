// app/admin/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Users, Package, MessageSquare, TrendingUp } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalContacts: number;
  totalBanners: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    totalContacts: 0,
    totalBanners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch statistics from API
      const responses = await Promise.all([fetch("/api/users?limit=1"), fetch("/api/products?limit=1"), fetch("/api/contacts?limit=1"), fetch("/api/banners?limit=1")]);

      const [users, products, contacts, banners] = await Promise.all(responses.map((r) => r.json()));

      setStats({
        totalUsers: users.pagination?.total || 0,
        totalProducts: products.pagination?.total || 0,
        totalContacts: contacts.pagination?.total || 0,
        totalBanners: banners.pagination?.total || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <Package className="w-8 h-8" />,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Contact Messages",
      value: stats.totalContacts,
      icon: <MessageSquare className="w-8 h-8" />,
      color: "bg-purple-500",
      change: "+23%",
    },
    {
      title: "Active Banners",
      value: stats.totalBanners,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-orange-500",
      change: "+5%",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className="text-green-500 text-sm mt-2">{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded"></div>
                  <div>
                    <p className="font-medium">Product {i}</p>
                    <p className="text-sm text-gray-500">Added 2 days ago</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">$99.99</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Contacts</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Contact Message {i}</p>
                  <p className="text-sm text-gray-500">user{i}@example.com</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Unread</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <span className="text-sm font-medium">Add User</span>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <Package className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <span className="text-sm font-medium">Add Product</span>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <MessageSquare className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <span className="text-sm font-medium">View Messages</span>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <span className="text-sm font-medium">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
