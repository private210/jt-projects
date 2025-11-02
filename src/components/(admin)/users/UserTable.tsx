"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import UserForm from "./UserForm";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

export default function UserTable() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    // Prevent deleting self
    if ((session?.user as any)?.id === id) {
      alert("Anda tidak dapat menghapus akun sendiri!");
      return;
    }

    if (!confirm(`Yakin hapus user ${email}?`)) return;

    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal menghapus user");
        return;
      }

      alert("User berhasil dihapus");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Terjadi kesalahan saat menghapus user");
    }
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Memuat data...</span>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Belum ada user terdaftar</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => {
                const isGoogleAccount = !user.password;
                const isCurrentUser = (session?.user as any)?.id === user.id;

                return (
                  <tr key={user.id} className={isCurrentUser ? "bg-blue-50" : "hover:bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.image ? (
                          <Image src={user.image} alt={user.username} className="h-10 w-10 rounded-full mr-3" width={40} height={40} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">{user.username.charAt(0).toUpperCase()}</div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                            {isCurrentUser && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Anda</span>}
                          </div>
                          <div className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleDateString("id-ID")}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "DEVELOPER" ? "bg-purple-100 text-purple-800" : user.role === "ADMIN" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isGoogleAccount ? (
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <FcGoogle size={16} />
                          <span>Google</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Email/Password</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleEdit(user)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id, user.email)} disabled={isCurrentUser}>
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit User */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                ×
              </button>
            </div>
            <UserForm
              mode="edit"
              initialData={editUser}
              onSuccess={() => {
                setShowEditModal(false);
                fetchUsers();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
