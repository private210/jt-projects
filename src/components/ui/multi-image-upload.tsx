// components/ui/multi-image-upload.tsx
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
}

export function MultiImageUpload({ images, onChange, label = "Gambar" }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setUploadError("");

    try {
      const uploadPromises = files.map(async (file) => {
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
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...images, ...uploadedUrls]);
    } catch (error: unknown) {
      console.error("Upload error:", error);
      if (error instanceof Error) {
        setUploadError(error.message || "Gagal mengupload gambar");
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

  const addUrlImage = () => {
    onChange([...images, ""]);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {/* Existing Images */}
      {images.map((url, index) => (
        <div key={index} className="space-y-2 p-3 border rounded-lg bg-gray-50">
          <div className="flex gap-2">
            <Input placeholder="URL gambar atau upload file" value={url} onChange={(e) => updateImageUrl(index, e.target.value)} />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(index)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {url && (
            <div className="relative w-full h-32">
              <Image src={url} alt={`Preview ${index + 1}`} fill className="object-contain rounded" />
            </div>
          )}
        </div>
      ))}

      {/* Upload Controls */}
      <div className="flex gap-2">
        <Input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} disabled={uploading} className="hidden" id="multi-file-upload" />
        <Button type="button" size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
        <div className="flex-1">
          <Button type="button" size="sm" variant="outline" onClick={addUrlImage} className="flex-1">
            <LinkIcon className="w-4 h-4 mr-2" />
            Tambah URL
          </Button>
        </div>
      </div>

      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
    </div>
  );
}
