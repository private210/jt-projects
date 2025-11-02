// components/ui/image-upload-input.tsx
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUploadInput({ value, onChange, label = "Gambar", placeholder = "https://example.com/image.jpg" }: ImageUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error: unknown) {
      console.error("Upload error:", error);
      if (error instanceof Error) {
        setUploadError(error.message || "Gagal mengupload gambar");
      } else if (typeof error === "object" && error !== null && "message" in error) {
        setUploadError(String((error as { message?: string }).message) || "Gagal mengupload gambar");
      } else {
        setUploadError("Gagal mengupload gambar");
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url">
            <LinkIcon className="w-4 h-4 mr-2" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-2">
          <Input type="url" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        </TabsContent>

        <TabsContent value="upload" className="space-y-2">
          <div className="flex gap-2">
            <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="flex-1" />
            {value && (
              <Button type="button" variant="outline" size="icon" onClick={handleRemoveImage} disabled={uploading}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {uploading && <p className="text-sm text-blue-600">Mengupload gambar...</p>}

          {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
        </TabsContent>
      </Tabs>

      {/* Preview */}
      {value && (
        <div className="mt-3 p-4 border rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className="relative w-full h-48">
            <Image src={value} alt="Preview" fill className="object-contain rounded" />
          </div>
        </div>
      )}
    </div>
  );
}
