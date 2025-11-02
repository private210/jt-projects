"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray } from "react-hook-form";
import { About, BrandPartner } from "@prisma/client";
import { Plus, Trash } from "lucide-react";
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

interface AboutWithPartners extends About {
  brandPartner: BrandPartner[];
  image: string | null;
}

interface AboutFormData {
  title: string;
  deskripsi: string;
  image: string;
  visi: string;
  misi: { value: string }[];
  layanan: { value: string }[];
}

export default function ManageAboutPage() {
  const [about, setAbout] = useState<AboutWithPartners | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<AboutFormData>({
    defaultValues: {
      title: "",
      deskripsi: "",
      image: "",
      visi: "",
      misi: [{ value: "" }],
      layanan: [{ value: "" }],
    },
  });

  const { fields: misiFields, append: appendMisi, remove: removeMisi } = useFieldArray({ control: form.control, name: "misi" });

  const { fields: layananFields, append: appendLayanan, remove: removeLayanan } = useFieldArray({ control: form.control, name: "layanan" });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await fetch("/api/about");
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      if (data) {
        setAbout(data);
        form.reset({
          title: data.title || "",
          deskripsi: data.deskripsi || "",
          image: data.image || "",
          visi: data.visi || "",
          misi: data.misi?.split("\n").map((item: string) => ({ value: item.trim() })) || [{ value: "" }],
          layanan: data.layanan?.split("\n").map((item: string) => ({ value: item.trim() })) || [{ value: "" }],
        });
      }
    } catch (error) {
      console.error("Failed to fetch about data:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data about",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AboutFormData) => {
    setSubmitting(true);
    try {
      const formatted = {
        ...data,
        misi: data.misi.map((m) => m.value).join("\n"),
        layanan: data.layanan.map((l) => l.value).join("\n"),
      };

      const response = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formatted),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updated = await response.json();
      setAbout(updated);

      toast({
        title: "Berhasil",
        description: "Data about berhasil diperbarui!",
      });
    } catch (error) {
      console.error("Failed to update about data:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui data about",
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
      <h1 className="text-3xl font-bold">Kelola Halaman About</h1>
      <Card>
        <CardHeader>
          <CardTitle>Konten About</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Judul */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Tentang Joyo Tech ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deskripsi */}
              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} placeholder="Deskripsi perusahaan..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Upload Gambar */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploadInput label="Gambar Banner" value={form.watch("image") ?? ""} onChange={(url) => form.setValue("image", url, { shouldValidate: true })} placeholder="https://example.com/banner.jpg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Visi */}
              <FormField
                control={form.control}
                name="visi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visi</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} placeholder="Visi perusahaan..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Misi Dinamis */}
              <div>
                <FormLabel>Misi</FormLabel>
                <div className="space-y-2 mt-2">
                  {misiFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center w-full">
                      <Input {...form.register(`misi.${index}.value` as const)} placeholder={`Misi ${index + 1}`} className="flex-1" />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeMisi(index)} disabled={misiFields.length === 1}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendMisi({ value: "" })} className="mt-2">
                    <Plus className="h-4 w-4 mr-1" /> Tambah Misi
                  </Button>
                </div>
              </div>

              {/* Layanan Dinamis */}
              <div>
                <FormLabel>Layanan</FormLabel>
                <div className="space-y-2 mt-2">
                  {layananFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center w-full">
                      <Input {...form.register(`layanan.${index}.value` as const)} placeholder={`Layanan ${index + 1}`} className="flex-1" />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeLayanan(index)} disabled={layananFields.length === 1}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendLayanan({ value: "" })} className="mt-2">
                    <Plus className="h-4 w-4 mr-1" /> Tambah Layanan
                  </Button>
                </div>
              </div>

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
