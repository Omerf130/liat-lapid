"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import formStyles from "./admin-forms.module.scss";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה בהעלאה");

      onChange(json.url);
      showToast("התמונה הועלתה בהצלחה");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "שגיאה בהעלאת תמונה",
        "error"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
      <label>{label}</label>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/example.jpg או URL"
          dir="ltr"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          className={formStyles.btnSmall}
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "מעלה..." : "העלאת תמונה"}
        </button>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          style={{
            marginTop: "0.75rem",
            maxWidth: 240,
            maxHeight: 160,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      )}
    </div>
  );
}
