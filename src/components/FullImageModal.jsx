import React from "react";

export default function FullImageModal({ url, onClose }) {
  if (!url) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
      {/* Click background to close */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      ></div>

      <div className="relative flex flex-col items-center justify-center z-[10000]">
        <img
          src={url}
          alt="Full Size"
          className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl object-contain"
        />

        {/* Back to Home button */}
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-900 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
