"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { FAQ } from "@prisma/client";
import { Pencil, Trash2, Plus } from "lucide-react";

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
interface FAQFormData {
  pertanyaan: string;
  jawaban: string;
  urutan: number;
  isActive: boolean;
}

export default function ManageFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const form = useForm<FAQFormData>({
    defaultValues: {
      pertanyaan: "",
      jawaban: "",
      urutan: 0,
      isActive: true,
    },
  });
  const fetchFAQs = useCallback(async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      console.error("Gagal memuat FAQ:", err);
    }
  }, []);
  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const onSubmit = async (data: FAQFormData) => {
    setSubmitting(true);
    try {
      const url = "/api/faq";
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...data, id: editingId } : data;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast({
        title: "Berhasil",
        description: `FAQ berhasil ${editingId ? "diperbarui" : "ditambahkan"}!`,
      });

      // Reset form dan refresh data
      form.reset();
      setEditingId(null);
      setShowForm(false);
      fetchFAQs();
    } catch (error) {
      console.error("Failed to save FAQ:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan FAQ",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    form.reset({
      pertanyaan: faq.pertanyaan,
      jawaban: faq.jawaban,
      urutan: faq.urutan,
      isActive: faq.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;

    try {
      const response = await fetch(`/api/faq?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast({
        title: "Berhasil",
        description: "FAQ berhasil dihapus!",
      });

      fetchFAQs();
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
      toast({
        title: "Error",
        description: "Gagal menghapus FAQ",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    form.reset();
    setEditingId(null);
    setShowForm(false);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kelola FAQ</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah FAQ
        </Button>
      </div>

      {/* Form Card */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit FAQ" : "Tambah FAQ Baru"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="pertanyaan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pertanyaan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan pertanyaan..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jawaban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jawaban</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} placeholder="Masukkan jawaban..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="urutan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urutan</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Status Aktif</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Menyimpan..." : editingId ? "Perbarui" : "Simpan"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Batal
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* List of FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          {faqs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Belum ada FAQ</p>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">#{faq.urutan}</span>
                        {faq.isActive ? <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Aktif</span> : <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Nonaktif</span>}
                      </div>
                      <h3 className="font-semibold mb-2">{faq.pertanyaan}</h3>
                      <p className="text-gray-600 text-sm">{faq.jawaban}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(faq)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(faq.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
