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
  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
    image: string | null;
    role: "EDITOR" | "ADMIN" | "DEVELOPER";
    isGoogleAccount: boolean;
  }>({
    username: "",
    email: "",
    password: "",
    image: null,
    role: "EDITOR",
    isGoogleAccount: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
        image: initialData.image || null,
        role: initialData.role || "EDITOR",
        isGoogleAccount: !initialData.password, // Jika tidak ada password, berarti Google account
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi
    if (!form.username || !form.email || !form.role) {
      setError("Username, email, dan role harus diisi");
      setLoading(false);
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid");
      setLoading(false);
      return;
    }

    // Validasi password untuk user baru non-Google
    if (mode === "create" && !form.isGoogleAccount && !form.password) {
      setError("Password wajib diisi untuk user baru non-Google");
      setLoading(false);
      return;
    }

    try {
      const method = mode === "edit" ? "PUT" : "POST";
      const body =
        mode === "edit"
          ? JSON.stringify({
              id: initialData.id,
              email: form.email,
              username: form.username,
              image: form.image,
              role: form.role,
              password: form.password || undefined,
            })
          : JSON.stringify({
              email: form.email,
              username: form.username,
              password: form.password || undefined,
              image: form.image,
              role: form.role,
              isGoogleAccount: form.isGoogleAccount,
            });

      const res = await fetch("/api/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal menyimpan user");
        setLoading(false);
        return;
      }

      setForm({ username: "", email: "", password: "",image: null, role: "EDITOR", isGoogleAccount: false });
      onSuccess();
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Terjadi kesalahan. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username / Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          className="border border-gray-300 p-2.5 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="John Doe"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className="border border-gray-300 p-2.5 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="john@example.com"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={mode === "edit"}
          required
        />
        {mode === "edit" && <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah setelah dibuat</p>}
      </div>

      {mode === "create" && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded">
          <input
            type="checkbox"
            id="isGoogleAccount"
            checked={form.isGoogleAccount}
            onChange={(e) => setForm({ ...form, isGoogleAccount: e.target.checked, password: "" })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="isGoogleAccount" className="text-sm text-gray-700 cursor-pointer">
            Ini adalah akun Google (tidak perlu password)
          </label>
        </div>
      )}

      {!form.isGoogleAccount && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password {mode === "create" && <span className="text-red-500">*</span>}
            {mode === "edit" && <span className="text-gray-500 text-xs ml-1">(kosongkan jika tidak ingin mengubah)</span>}
          </label>
          <input
            className="border border-gray-300 p-2.5 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={mode === "create" && !form.isGoogleAccount}
            minLength={6}
          />
          {mode === "create" && <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>}
        </div>
      )}

      <ImageUploadInput value={form.image ?? ""} onChange={(image) => setForm({ ...form, image })} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          className="border border-gray-300 p-2.5 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value as "EDITOR" | "ADMIN" | "DEVELOPER" })
          }
          required
        >
          <option value="EDITOR">EDITOR - Kelola Produk & Banner</option>
          <option value="ADMIN">ADMIN - Akses Penuh (kecuali manage users)</option>
          <option value="DEVELOPER">DEVELOPER - Full Access</option>
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button disabled={loading} type="submit" className="flex-1">
          {loading ? "Menyimpan..." : mode === "edit" ? "Update User" : "Tambah User"}
        </Button>
      </div>
    </form>
  );
}
