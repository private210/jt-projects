"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserForm from "@/components/(admin)/users/UserForm";
import UserTable from "@/components/(admin)/users/UserTable";

export default function ManageUsersClient() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = () => {
    setShowModal(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Kelola Pengguna</h2>
        <Button onClick={() => setShowModal(true)}>+ Tambah User</Button>
      </div>

      <UserTable key={refreshKey} />

      {/* Modal Tambah User */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Tambah User Baru</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-black">
                ✕
              </button>
            </div>
            <UserForm mode="create" onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}
