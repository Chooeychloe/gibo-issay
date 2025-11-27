import React from "react";

export default function ImageGrid({
  images,
  setDeleteIndex,
  setShowPasswordModal,
  setFullImage,
}) {
 

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img, index) => (
        <div key={index} className="relative group rounded-xl overflow-hidden shadow-lg">

          {/* Click image to view full size */}
          <img
            src={img.url}
            alt="Uploaded"
            onClick={() => setFullImage(img.url)}
            className="w-full h-48 object-cover cursor-pointer"
          />

          {/* Overlay buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 pointer-events-none">
            
            

            {/* DELETE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering full-size modal
                setDeleteIndex(index);
                setShowPasswordModal(true);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 text-sm pointer-events-auto"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}
