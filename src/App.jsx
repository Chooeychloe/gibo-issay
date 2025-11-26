import React, { useState, useEffect } from "react";
import axios from "axios";
import MasonryGrid from "./components/MasonryGrid";
import PasswordModal from "./components/PasswordModal";
import FullImageModal from "./components/FullImageModal";

const CLOUD_NAME = "dn6f6gtjm";
const UPLOAD_PRESET = "wedding_upload";
const DELETE_PASSWORD = "secret123";

export default function App() {
  const [images, setImages] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [fullImage, setFullImage] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("images") || "[]");
    requestAnimationFrame(() => {
      setImages(stored.map((url) => ({ url, showDelete: false })));
    });
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        uploadedUrls.push({ url: res.data.secure_url, showDelete: false });
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    const finalList = [...images, ...uploadedUrls];
    setImages(finalList);
    localStorage.setItem(
      "images",
      JSON.stringify(finalList.map((img) => img.url))
    );
  };

  // Delete image after correct password
  const handleDeleteConfirmed = () => {
    if (deleteIndex === null) return;
    const newImages = [...images];
    newImages.splice(deleteIndex, 1);
    setImages(newImages);
    localStorage.setItem(
      "images",
      JSON.stringify(newImages.map((img) => img.url))
    );
    setDeleteIndex(null);
    setShowPasswordModal(false);
  };

  return (
    <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-6">
      <div className="flex items-center justify-center gap-4 mb-4">
        <img
          src="/issay-gibo.png"
          alt="Wedding Icon"
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-4">
         Gibo & Issay Wedding Collage Wall
        </h1>
      </div>

      <p className="text-center mb-4 text-lg">
        Upload your photo and become part of the celebration!
      </p>

      {/* Upload Button */}
      <div className="flex justify-center mb-6">
        <label className="px-6 py-3 bg-indigo-900 text-white rounded-xl cursor-pointer shadow-lg hover:bg-indigo-900">
          Upload Photos
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      {/* Masonry Grid */}
      <MasonryGrid
        images={images}
        setDeleteIndex={setDeleteIndex}
        setShowPasswordModal={setShowPasswordModal}
        setFullImage={setFullImage}
      />

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          correctPassword={DELETE_PASSWORD}
          onCancel={() => setShowPasswordModal(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}

      {/* Full-Size Image Modal */}
      {fullImage && (
        <FullImageModal url={fullImage} onClose={() => setFullImage(null)} />
      )}
    </div>
  );
}
