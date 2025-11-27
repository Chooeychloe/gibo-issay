import React, { useState } from "react";
import { X, Download, Trash2 } from "lucide-react";

export default function FullImageModal({ image, onClose, onDeleteRequest }) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch(image.url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "wedding_photo.jpg";
      link.click();

      setSaving(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save image.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-xl p-4 max-w-3xl w-full shadow-xl">
        
        {/* Close Button (Lucide X Icon) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <X className="h-6 w-6 text-indigo-900" />
        </button>

        <img
          src={image.url}
          alt="Full size"
          className="w-full rounded-lg max-h-[75vh] object-contain"
        />

        <div className="flex justify-end mt-4 gap-3">

          {/* Download Button */}
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-900 flex items-center gap-2"
            disabled={saving}
          >
            <Download className="h-5 w-5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={onDeleteRequest}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 className="h-5 w-5" />
            
          </button>
        </div>
      </div>
    </div>
  );
}
