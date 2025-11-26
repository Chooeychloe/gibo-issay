import React from "react";

export default function MasonryGrid({
  images,
  setDeleteIndex,
  setShowPasswordModal,
  setFullImage,
}) {
  // Save image to device
  const handleSave = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = url.split("/").pop().split("?")[0];
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
      {images.map((img, index) => (
        <div
          key={index}
          className="mb-4 break-inside-avoid relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
        >
          {/* Click image to view full size */}
          <img
            src={img.url}
            alt="Uploaded"
            onClick={() => setFullImage(img.url)}
            className="w-full rounded-xl object-cover"
          />

          {/* Overlay buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave(img.url);
              }}
              className="px-3 py-1 bg-indigo-700 text-white rounded shadow hover:bg-indigo-900 pointer-events-auto text-sm"
            >
              Download
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteIndex(index);
                setShowPasswordModal(true);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 pointer-events-auto text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
