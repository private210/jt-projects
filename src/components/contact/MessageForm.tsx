"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MessageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto mt-6 h-auto">
      <h2 className="font-semibold mb-4 text-lg text-gray-800">Kirim Pesan</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nama & Email */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* Subjek */}
        <input
          type="text"
          placeholder="Subjek"
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />

        {/* Pesan (textarea) */}
        <textarea
          placeholder="Pesan"
          className="w-full border border-gray-300 p-2 rounded h-32 resize-none focus:ring-2 focus:ring-red-500 focus:outline-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        ></textarea>

        {/* Status Feedback */}
        {status === "success" && <p className="text-green-600 text-sm">Pesan berhasil dikirim!</p>}
        {status === "error" && <p className="text-red-600 text-sm">Gagal mengirim pesan. Silakan coba lagi.</p>}

        {/* Tombol */}
        <Button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-joyo-red/50 hover:text-joyo-white transition-colors" disabled={status === "loading"}>
          {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
        </Button>
      </form>
    </div>
  );
}
