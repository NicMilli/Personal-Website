import { useRef, useState, type DragEvent, type ChangeEvent } from "react";

interface ImageUploadProps {
  onFile: (file: File) => void;
  disabled?: boolean;
}

export default function ImageUpload({ onFile, disabled }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) { return; }
    const file = e.dataTransfer.files[0];
    if (file) { onFile(file); }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { onFile(file); }
  }

  return (
    <div
      onClick={() => { if (!disabled) { inputRef.current?.click(); } }}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) { setDragging(true); } }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`cursor-pointer rounded-xl border-2 border-dashed px-4 py-3 text-center text-xs text-gray-500 transition-colors ${
        dragging ? "border-purple-400 bg-purple-50" : "border-gray-300 hover:border-gray-400"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
      Drop image or click to upload (JPG/PNG/WEBP, max 5MB)
    </div>
  );
}
