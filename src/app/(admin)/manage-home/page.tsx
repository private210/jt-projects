"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ImageUploadInput } from "@/components/ui/image-upload-input";

/* ---------- Local Toast Fallback ---------- */
function useToast() {
  const toast = ({ title, description, variant }: { title?: string; description?: string; variant?: string }) => {
    if (typeof window !== "undefined") {
      if (variant === "destructive") {
        alert(`${title ? title + " - " : ""}${description || ""}`);
      } else {
        console.log("Toast:", { title, description, variant });
      }
    }
  };
  return { toast };
}

/* ---------- Interface ---------- */
interface HomeFormData {
  title: string;
  deskripsi: string;
  image: string;
}

/* ---------- Component ---------- */
export default function ManageHomePage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<HomeFormData>({
    defaultValues: {
      title: "",
      deskripsi: "",
      image: "",
    },
  });

  /* ---------- useEffect diperbaiki ---------- */
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch("/api/home");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        form.reset({
          title: data?.title || "",
          deskripsi: data?.deskripsi || "",
          image: data?.image || "",
        });
      } catch (error) {
        console.error("Failed to fetch home data:", error);
        toast({
          title: "Error",
          description: "Gagal memuat data home",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [form, toast]);

  /* ---------- Submit Handler ---------- */
  const onSubmit = async (data: HomeFormData) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast({
        title: "Berhasil",
        description: "Data home berhasil diperbarui!",
      });
    } catch (error) {
      console.error("Failed to update home data:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui data home",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- UI ---------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Kelola Halaman Home</h1>
      <Card>
        <CardHeader>
          <CardTitle>Konten Hero Home</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Solusi Teknologi Terlengkap" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} placeholder="Deskripsi singkat tentang perusahaan..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ImageUploadInput label="Gambar Banner" value={form.getValues("image")} onChange={(url) => form.setValue("image", url)} placeholder="https://example.com/banner.jpg" />

              <Button type="submit" disabled={submitting}>
                {submitting ? "Menyimpan..." : "Perbarui Data"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
