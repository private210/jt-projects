"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.error) {
      router.push("/dashboard");
    } else {
      alert("Email atau password salah!");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4 border border-gray-100">
        <h2 className="text-2xl font-bold text-center">Login Admin</h2>

        {/* Input manual login */}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md p-2" required />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-md p-2" required />

        <Button type="submit" className="w-full">
          Login
        </Button>

        {/* Divider */}
        <div className="flex items-center justify-center my-3">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-2 text-gray-500 text-sm">atau</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google login */}
        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleLogin}>
          <FcGoogle size={20} /> Masuk dengan Google
        </Button>
      </form>
    </div>
  );
}
