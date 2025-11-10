"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

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
interface ContactFormData {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  whatsapp: string;
  linkedin: string;
  whatsappNumber: string;
  email: string;
  address: string;
  mapsLink: string;
  operationalHours: string;
  tokopedia: string;
  shopee: string;
  tiktokshop: string;
}

/* ---------- Component ---------- */
export default function ManageContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    defaultValues: {
      facebook: "",
      instagram: "",
      youtube: "",
      tiktok: "",
      whatsapp: "",
      linkedin: "",
      whatsappNumber: "",
      email: "",
      address: "",
      mapsLink: "",
      operationalHours: "",
      tokopedia: "",
      shopee: "",
      tiktokshop: "",
    },
  });

  /* ---------- Fetch Initial Data ---------- */
 useEffect(() => {
   const fetchData = async () => {
     try {
       const [contactRes, marketplaceRes] = await Promise.all([fetch("/api/contacts"), fetch("/api/marketplaces")]);

       if (!contactRes.ok || !marketplaceRes.ok) {
         throw new Error("Gagal memuat data");
       }

       const contact = await contactRes.json();
       const marketplace = await marketplaceRes.json();

       form.reset({
         facebook: contact?.facebook || "",
         instagram: contact?.instagram || "",
         youtube: contact?.youtube || "",
         tiktok: contact?.tiktok || "",
         whatsapp: contact?.whatsapp || "",
         linkedin: contact?.linkedin || "",
         whatsappNumber: contact?.nomor_wa || "",
         email: contact?.email || "",
         address: contact?.alamat || "",
         mapsLink: contact?.maps_link || "",
         operationalHours: contact?.jam_operasional || "",
         tokopedia: marketplace?.tokopedia || "",
         shopee: marketplace?.shopee || "",
         tiktokshop: marketplace?.tiktokshop || "",
       });
     } catch (error) {
       console.error("Failed to fetch data:", error);
       toast({
         title: "Error",
         description: "Gagal memuat data. Silakan refresh halaman.",
         variant: "destructive",
       });
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, [form, toast]);


  const loadData = async () => {
    try {
      const [contactRes, marketplaceRes] = await Promise.all([fetch("/api/contacts"), fetch("/api/marketplaces")]);

      if (!contactRes.ok || !marketplaceRes.ok) {
        throw new Error("Gagal memuat data");
      }

      const contact = await contactRes.json();
      const marketplace = await marketplaceRes.json();

      // Sinkronkan dengan form
      form.reset({
        facebook: contact?.facebook || "",
        instagram: contact?.instagram || "",
        youtube: contact?.youtube || "",
        tiktok: contact?.tiktok || "",
        whatsapp: contact?.whatsapp || "",
        linkedin: contact?.linkedin || "",
        whatsappNumber: contact?.nomor_wa || "",
        email: contact?.email || "",
        address: contact?.alamat || "",
        mapsLink: contact?.maps_link || "",
        operationalHours: contact?.jam_operasional || "",
        tokopedia: marketplace?.tokopedia || "",
        shopee: marketplace?.shopee || "",
        tiktokshop: marketplace?.tiktokshop || "",
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data. Silakan refresh halaman.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Submit Handler ---------- */
  const onSubmit = async (data: ContactFormData) => {
    setSaving(true);
    try {
      // Simpan contact
      const contactRes = await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          whatsappNumber: data.whatsappNumber,
          address: data.address,
          mapsLink: data.mapsLink,
          operationalHours: data.operationalHours,
          instagram: data.instagram,
          tiktok: data.tiktok,
          facebook: data.facebook,
          whatsapp: data.whatsapp,
          youtube: data.youtube,
          linkedin: data.linkedin,
        }),
      });

      const contactJson = await contactRes.json();
      if (!contactRes.ok || !contactJson.success) {
        throw new Error(contactJson.error || "Gagal memperbarui kontak");
      }

      // Simpan marketplace
      const marketplaceRes = await fetch("/api/marketplaces", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokopedia: data.tokopedia,
          shopee: data.shopee,
          tiktokshop: data.tiktokshop,
        }),
      });

      const marketplaceJson = await marketplaceRes.json();
      if (!marketplaceRes.ok || !marketplaceJson.success) {
        throw new Error(marketplaceJson.error || "Gagal memperbarui marketplace");
      }

      toast({
        title: "✅ Berhasil!",
        description: "Data Contact & Marketplace berhasil diperbarui.",
        variant: "default",
      });

      await loadData();
    } catch (error) {
      console.error("Failed to update:", error);
      toast({
        title: "❌ Gagal!",
        description: error instanceof Error ? error.message : "Gagal memperbarui data!",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ---------- UI ---------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Contact & Marketplace</h1>
        <p className="text-muted-foreground">Kelola informasi kontak, sosial media, dan marketplace perusahaan Anda.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* SECTION 1 - SOCIAL MEDIA & BASIC CONTACT */}
          <Card>
            <CardHeader>
              <CardTitle>Contact & Social Media</CardTitle>
              <CardDescription>Masukkan tautan media sosial dan informasi dasar kontak bisnis.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "facebook", label: "Facebook" },
                { name: "instagram", label: "Instagram" },
                { name: "youtube", label: "YouTube" },
                { name: "tiktok", label: "TikTok" },
                { name: "whatsapp", label: "WhatsApp Link" },
                { name: "linkedin", label: "LinkedIn" },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof ContactFormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={`https://www.${name}/...`} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+6281234567890" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="your@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SECTION 2 - LOCATION & OPERASIONAL */}
          <Card>
            <CardHeader>
              <CardTitle>Alamat & Operasional</CardTitle>
              <CardDescription>Informasi lokasi, peta, dan jam operasional bisnis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="mapsLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Maps Link</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://www.google.com/maps/embed?pb=..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} placeholder="Jl. Contoh No.123, Jakarta" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="operationalHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Operasional</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} placeholder={`Senin - Jumat: 08.00 - 17.00\nSabtu: 08.00 - 12.00`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SECTION 3 - MARKETPLACE */}
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Integration</CardTitle>
              <CardDescription>Hubungkan produk Anda ke marketplace populer.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "tokopedia", label: "Tokopedia" },
                { name: "shopee", label: "Shopee" },
                { name: "tiktokshop", label: "TikTok Shop" },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof ContactFormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={`Link ${label}`} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>

            <div className="px-6 pb-6">
              <Button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto">
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menyimpan...
                  </>
                ) : (
                  "Update Contact & Marketplace"
                )}
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
