"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { SettingSite } from "@prisma/client";
import { useSiteSettings } from "@/app/contexts/SiteSettingsContext";
import { ImageUploadInput } from "@/components/ui/image-upload-input";


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

interface SiteSettingFormData {
  logo: string;
  nama_company: string;
  metadataTitle: string;
  favicon: string;
  metakeyword: string;
  metadesc: string;
}

export default function ManageSiteSettingPage() {
  const [siteSetting, setSiteSetting] = useState<SettingSite | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { refreshSettings } = useSiteSettings();

  const form = useForm<SiteSettingFormData>({
    defaultValues: {
      logo: "",
      nama_company: "",
      metadataTitle: "",
      favicon: "",
      metakeyword: "",
      metadesc: "",
    },
  });

  useEffect(() => {
    fetchSiteSetting();
  }, []);

  const fetchSiteSetting = async () => {
    try {
      const response = await fetch("/api/site-settings");
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      if (data) {
        setSiteSetting(data);
        form.reset({
          logo: data.logo || "",
          nama_company: data.nama_company || "",
          metadataTitle: data.metadataTitle || "",
          favicon: data.favicon || "",
          metakeyword: data.metakeyword || "",
          metadesc: data.metadesc || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch site settings:", error);
      toast({
        title: "Error",
        description: "Gagal memuat site settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SiteSettingFormData) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updated = await response.json();
      setSiteSetting(updated);

      // Refresh site settings context
      await refreshSettings();

      toast({
        title: "Berhasil",
        description: "Site settings berhasil diperbarui! Halaman akan dimuat ulang...",
      });

      // Reload page to apply changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Failed to update site settings:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui site settings",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Kelola Site Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Website</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="nama_company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Perusahaan *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Joyo Tech ID" />
                    </FormControl>
                    <FormDescription>Nama perusahaan akan muncul di navbar, footer, dan meta tags</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Logo URL - GANTI INI */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <ImageUploadInput label="Logo Perusahaan" value={field.value} onChange={field.onChange} placeholder="https://example.com/logo.png" />
                    <FormDescription>Logo yang akan ditampilkan di navbar dan footer</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Favicon - GANTI INI */}
              <FormField
                control={form.control}
                name="favicon"
                render={({ field }) => (
                  <FormItem>
                    <ImageUploadInput label="Favicon" value={field.value} onChange={field.onChange} placeholder="https://example.com/favicon.ico" />
                    <FormDescription>Icon kecil yang muncul di tab browser (format: .ico, .png, .svg)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Metadata Title */}
              <FormField
                control={form.control}
                name="metadataTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metadata Title *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Joyo Tech ID - Solusi Teknologi Terpercaya" />
                    </FormControl>
                    <FormDescription>Judul yang muncul di tab browser dan hasil pencarian Google</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meta Keywords */}
              <FormField
                control={form.control}
                name="metakeyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Keywords</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} placeholder="toko elektronik, handphone, laptop, gadget, ponorogo" />
                    </FormControl>
                    <FormDescription>Kata kunci untuk SEO (pisahkan dengan koma)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meta Description */}
              <FormField
                control={form.control}
                name="metadesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Joyo Tech ID menyediakan berbagai produk elektronik berkualitas dengan harga terbaik di Ponorogo..." />
                    </FormControl>
                    <FormDescription>Deskripsi singkat yang muncul di hasil pencarian Google (max 160 karakter)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                {submitting ? "Menyimpan..." : "Perbarui Site Settings"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 text-blue-900">ℹ️ Informasi Penting</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Perubahan akan diterapkan ke seluruh website</li>
            <li>• Logo dan favicon harus berupa URL yang valid</li>
            <li>• Halaman akan dimuat ulang setelah perubahan disimpan</li>
            <li>• Pastikan ukuran logo tidak terlalu besar (max 2MB)</li>
            <li>• Favicon sebaiknya berukuran 32x32px atau 64x64px</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
