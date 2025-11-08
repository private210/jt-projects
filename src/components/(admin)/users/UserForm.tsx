"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploadInput } from "@/components/ui/image-upload-input";

interface UserFormProps {
  onSuccess: () => void;
  initialData?: {
    id?: string;
    username?: string;
    email?: string;
    role?: "EDITOR" | "ADMIN" | "DEVELOPER";
    password?: string;
    image?: string | null;
  };
  mode?: "create" | "edit";
}

export default function UserForm({ onSuccess, initialData = {}, mode = "create" }: UserFormProps) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    image: null as string | null,
    role: "EDITOR" as "EDITOR" | "ADMIN" | "DEVELOPER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm((prev) => ({
        ...prev,
        username: initialData.username || "",
        email: initialData.email || "",
        image: initialData.image || null,
        role: initialData.role || "EDITOR",
      }));
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.username || !form.email || !form.role) {
      setError("Username, email, dan role harus diisi");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid");
      setLoading(false);
      return;
    }

    if (mode === "create" && !form.password) {
      setError("Password wajib diisi untuk user baru");
      setLoading(false);
      return;
    }

    try {
      const method = mode === "edit" ? "PUT" : "POST";
      const payload =
        mode === "edit"
          ? {
              id: initialData.id,
              email: form.email,
              username: form.username,
              image: form.image,
              role: form.role,
              password: form.password || undefined,
            }
          : {
              email: form.email,
              username: form.username,
              password: form.password,
              image: form.image,
              role: form.role,
            };

      const res = await fetch("/api/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menyimpan user");
      }

      setForm({
        username: "",
        email: "",
        password: "",
        image: null,
        role: "EDITOR",
      });
      onSuccess();
    } catch (err: unknown) {
      console.error("Error saving user:", err);
      setError(err instanceof Error ? err.message || "Terjadi kesalahan. Coba lagi." : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center max-w-3xl">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl space-y-5 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">{mode === "edit" ? "Edit Pengguna" : "Tambah Pengguna"}</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username / Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="John Doe"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="john@example.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={mode === "edit"}
            required
          />
          {mode === "edit" && <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah setelah dibuat</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password {mode === "create" ? <span className="text-red-500">*</span> : <span className="text-gray-500 text-xs ml-1">(kosongkan jika tidak ingin mengubah)</span>}
          </label>
          <input
            className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={mode === "create"}
            minLength={6}
          />
          {mode === "create" && <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>}
        </div>

        {/* Upload Gambar */}
        <ImageUploadInput value={form.image ?? ""} onChange={(image) => setForm({ ...form, image })} />

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value as "EDITOR" | "ADMIN" | "DEVELOPER",
              })
            }
            required
          >
            <option value="EDITOR">EDITOR - Kelola Produk & Banner</option>
            <option value="ADMIN">ADMIN - Akses Penuh (kecuali manage users)</option>
            <option value="DEVELOPER">DEVELOPER - Full Access</option>
          </select>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end pt-3">
          <Button disabled={loading} type="submit" className="w-full md:w-auto px-6">
            {loading ? "Menyimpan..." : mode === "edit" ? "Update User" : "Tambah User"}
          </Button>
        </div>
      </form>
    </div>
  );
}
