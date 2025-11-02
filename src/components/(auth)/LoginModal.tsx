"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Login dengan Email & Password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Email atau password salah.");
        setLoading(false);
      } else if (res?.ok) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan, coba lagi nanti.");
      setLoading(false);
    }
  };

  // --- Login dengan Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        // Error dari NextAuth
        if (result.error === "OAuthAccountNotLinked") {
          setError("Email sudah terdaftar dengan metode login lain.");
        } else if (result.error === "AccessDenied") {
          setError("Akun Google Anda belum terdaftar. Hubungi admin untuk mendaftarkan akun Anda.");
        } else {
          setError("Gagal login dengan Google. Silakan coba lagi.");
        }
        setLoading(false);
      } else if (result?.ok) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Gagal login dengan Google.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fadeIn">
        {/* Tombol close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close" disabled={loading}>
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login Admin</h2>
          <p className="text-sm text-gray-500 mt-1">Masuk ke dashboard admin</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full text-white py-2.5" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Memproses...
              </span>
            ) : (
              "Masuk"
            )}
          </Button>
        </form>

        {/* Divider */}
        {/* <div className="flex items-center justify-center my-5">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-500 text-sm">atau</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div> */}

        {/* Login dengan Google */}
        {/* <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2 py-2.5 hover:bg-gray-50 transition" onClick={handleGoogleLogin} disabled={loading}>
          <FcGoogle size={20} />
          Masuk dengan Google
        </Button> */}

        {/* Info */}
        <p className="text-xs text-gray-500 text-center mt-4">Hanya admin yang terdaftar yang dapat mengakses sistem</p>
      </div>
    </div>
  );
}
