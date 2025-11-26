import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import MasonryGrid from "./components/MasonryGrid";
import PasswordModal from "./components/PasswordModal";
import FullImageModal from "./components/FullImageModal";

// --- Supabase Setup ---
const SUPABASE_URL = 'https://csnwhimbfcqnymjugsom.supabase.co' // your URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbndoaW1iZmNxbnltanVnc29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDc1NzksImV4cCI6MjA3OTcyMzU3OX0.exwo5xPHyjm7K913k9lMP75w-BZabXlDAWLNWHkE2y0' // your anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Password to delete images
const DELETE_PASSWORD = "secret123";

// Storage folder name
const STORAGE_FOLDER = "wedding_photos";

export default function App() {
  const [images, setImages] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [fullImage, setFullImage] = useState(null);

  // Load images from Supabase storage
  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from(STORAGE_FOLDER)
      .list("", { limit: 100, offset: 0 });

    if (error) {
      console.error("Error fetching images:", error.message);
      return;
    }

    // Get public URLs
    const urls = data.map((file) => ({
      url: supabase.storage.from(STORAGE_FOLDER).getPublicUrl(file.name).data.publicUrl,
      name: file.name,
      showDelete: false,
    }));

    setImages(urls);
  };

  useEffect(() => {
  let isMounted = true; // flag to prevent state update if unmounted

  const loadImages = async () => {
    const { data, error } = await supabase.storage
      .from(STORAGE_FOLDER)
      .list("", { limit: 100, offset: 0 });

    if (!error && isMounted) {
      const urls = data.map((file) => ({
        url: supabase.storage.from(STORAGE_FOLDER).getPublicUrl(file.name).data.publicUrl,
        name: file.name,
        showDelete: false,
      }));
      setImages(urls);
    }
  };

  loadImages();

  return () => {
    isMounted = false;
  };
}, []);


  // Upload images
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from(STORAGE_FOLDER)
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error.message);
      }
    }
    fetchImages();
  };

  // Delete image after password
  const handleDeleteConfirmed = async () => {
    if (deleteIndex === null) return;
    const image = images[deleteIndex];

    const { error } = await supabase.storage
      .from(STORAGE_FOLDER)
      .remove([image.name]);

    if (error) {
      console.error("Delete error:", error.message);
      return;
    }

    const newImages = [...images];
    newImages.splice(deleteIndex, 1);
    setImages(newImages);
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
        <label className="px-6 py-3 bg-indigo-900 text-white rounded-xl cursor-pointer shadow-lg hover:bg-indigo-800">
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
