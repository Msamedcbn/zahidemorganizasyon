"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB — original file, before client-side compression
const MAX_UPLOAD_DIMENSION = 2000;

// Vercel serverless functions cap request bodies at 4.5MB, and desktop camera
// photos routinely exceed that. Downscale + re-encode in the browser first so
// the upload always fits, regardless of the original file's size or EXIF orientation.
async function compressImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_UPLOAD_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    return blob || file;
  } catch {
    return file;
  }
}

export function ImageUpload({ value, onChange, folder = "uploads", label = "Görsel Yükle" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir görsel dosyası seçin.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Görsel 25MB'tan büyük olamaz.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const toUpload = await compressImage(file);
      const formData = new FormData();
      formData.append("file", toUpload, "upload.jpg");
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || `Yükleme hatası (${res.status})`);

      onChange(data.url);
      setPreview(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel yüklenirken hata oluştu. Tekrar deneyin.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const clear = () => {
    onChange("");
    setPreview("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-foreground/80">{label}</label>}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative rounded-xl transition-colors ${dragActive ? "ring-2 ring-primary ring-offset-2" : ""}`}
      >
        {preview ? (
          <div className="relative group w-full h-48 rounded-xl overflow-hidden bg-black/5 border border-foreground/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="w-full h-full object-contain" />

            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm">Yükleniyor...</span>
              </div>
            )}

            {!uploading && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="bg-white/90 text-foreground text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white transition-colors"
                >
                  Değiştir
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="bg-red-500 text-white w-7 h-7 rounded-full text-sm flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        ) : (
          <label
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-primary/5 ${
              dragActive ? "border-primary bg-primary/10" : "border-primary/30 hover:border-primary/60"
            }`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary mb-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-sm text-muted">{uploading ? "Yükleniyor..." : "Tıklayın veya sürükleyin"}</span>
            <span className="text-xs text-muted/70 mt-1">PNG, JPG, WEBP — en fazla 25MB</span>
          </label>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={uploading}
          className="hidden"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
