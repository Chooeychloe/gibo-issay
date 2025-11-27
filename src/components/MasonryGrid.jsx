import React from "react";

export default function MasonryGrid({
  images,
  setFullImage,
}) {
  

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
            onClick={() => setFullImage(img)}
            className="w-full rounded-xl object-cover"
          />

         
        </div>
      ))}
    </div>
  );
}
