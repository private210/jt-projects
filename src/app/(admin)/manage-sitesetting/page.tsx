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

/* ============ SIMPLE TOAST FALLBACK ============ */
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

/* ============ TYPES ============ */
interface SiteSettingFormData {
  logo: string;
  nama_company: string;
  metadataTitle: string;
  favicon: string;
  metakeyword: string;
  metadesc: string;
}

/* ============ COMPONENT ============ */
export default function ManageSiteSettingPage() {
  const [, setSiteSetting] = useState<SettingSite | null>(null);
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

  /* ✅ Perbaikan useEffect agar aman dan bersih */
  useEffect(() => {
    let isMounted = true; // Cegah update state jika komponen unmounted

    const fetchSiteSetting = async () => {
      try {
        const response = await fetch("/api/site-settings", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch site settings");

        const data = await response.json();
        if (isMounted && data) {
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
        console.error("Gagal memuat site settings:", error);
        if (isMounted) {
          toast({
            title: "Error",
            description: "Gagal memuat site settings",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSiteSetting();

    return () => {
      isMounted = false; // cleanup agar tidak setState setelah unmount
    };
  }, [form, toast]);

  /* ✅ Submit Handler */
  const onSubmit = async (data: SiteSettingFormData) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update site settings");

      const updated = await response.json();
      setSiteSetting(updated);
      await refreshSettings();

      toast({
        title: "Berhasil",
        description: "Site settings berhasil diperbarui! Halaman akan dimuat ulang...",
      });

      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Gagal memperbarui site settings:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui site settings",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ✅ Loading state */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  /* ✅ Render form */
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
              {/* Nama Perusahaan */}
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

              {/* Logo */}
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

              {/* Favicon */}
              <FormField
                control={form.control}
                name="favicon"
                render={({ field }) => (
                  <FormItem>
                    <ImageUploadInput label="Favicon" value={field.value} onChange={field.onChange} placeholder="https://example.com/favicon.ico" />
                    <FormDescription>Icon kecil yang muncul di tab browser</FormDescription>
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
                    <FormDescription>Judul yang muncul di tab browser dan hasil pencarian</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Keywords */}
              <FormField
                control={form.control}
                name="metakeyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Keywords</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} placeholder="toko elektronik, handphone, laptop, gadget, ponorogo" />
                    </FormControl>
                    <FormDescription>Kata kunci SEO, pisahkan dengan koma</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="metadesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Deskripsi singkat website..." />
                    </FormControl>
                    <FormDescription>Deskripsi singkat untuk hasil pencarian Google</FormDescription>
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

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 text-blue-900">ℹ️ Informasi Penting</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Perubahan akan diterapkan ke seluruh website</li>
            <li>• Logo dan favicon harus berupa URL valid</li>
            <li>• Halaman akan dimuat ulang setelah disimpan</li>
            <li>• Ukuran logo max 2MB</li>
            <li>• Favicon sebaiknya 32x32px atau 64x64px</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
