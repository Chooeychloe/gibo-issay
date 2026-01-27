import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import MasonryGrid from "../components/MasonryGrid";
import PasswordModal from "../components/PasswordModal";
import FullImageModal from "../components/FullImageModal";

const SUPABASE_URL = "https://csnwhimbfcqnymjugsom.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbndoaW1iZmNxbnltanVnc29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDc1NzksImV4cCI6MjA3OTcyMzU3OX0.exwo5xPHyjm7K913k9lMP75w-BZabXlDAWLNWHkE2y0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const DELETE_PASSWORD = "LucasLiam1725";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [fullImage, setFullImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch images from Supabase table
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch images error:", error);
      return;
    }

    setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Fixed upload function - only insert URL
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedImages = [];

    try {
      for (let file of files) {
        if (!file.type.startsWith("image/")) {
          console.warn(`Skipping non-image file: ${file.name}`);
          continue;
        }

        const filePath = `public/${Date.now()}_${file.name}`;

        // Upload file to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("wedding_photos")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          continue;
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("wedding_photos").getPublicUrl(filePath);

        // ✅ FIXED: Only insert the URL (the only column that likely exists)
        const { data: insertData, error: insertError } = await supabase
          .from("images")
          .insert([
            {
              url: publicUrl,
              // Remove all other columns for now
            },
          ])
          .select();

        if (insertError) {
          console.error("Insert table error:", insertError.message);
          // Clean up uploaded file
          await supabase.storage.from("wedding_photos").remove([filePath]);
          continue;
        }

        if (insertData && insertData.length > 0) {
          // Store the file path in memory for deletion (not in database)
          const imageWithPath = {
            ...insertData[0],
            path: filePath, // Store locally for deletion
          };
          uploadedImages.push(imageWithPath);
        }
      }
    } catch (error) {
      console.error("Upload process error:", error);
      alert("Error uploading images. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Updated delete function that extracts path from URL
  // In your App.jsx - make sure this delete function is present
  const handleDeleteConfirmed = async () => {
    if (deleteIndex === null) return;

    const imageToDelete = images[deleteIndex];

    try {
      let filePath = imageToDelete.path;

      // If path isn't stored, extract from URL
      if (!filePath && imageToDelete.url) {
        const urlParts = imageToDelete.url.split(
          "/storage/v1/object/public/wedding_photos/"
        );
        if (urlParts.length > 1) {
          filePath = urlParts[1];
        }
      }

      // Delete from storage
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("wedding_photos")
          .remove([filePath]);

        if (storageError) throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from("images")
        .delete()
        .eq("id", imageToDelete.id);

      if (dbError) throw dbError;

      // Update UI
      setImages((prev) => prev.filter((_, index) => index !== deleteIndex));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting image: " + error.message);
    } finally {
      setDeleteIndex(null);
      setShowPasswordModal(false);
    }
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

      <div className="flex justify-center mb-6">
        <label
          className={`px-6 py-3 bg-indigo-900 text-white rounded-xl cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Photos"}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {uploading && (
        <div className="text-center mb-4">
          <p className="text-indigo-700">Uploading images, please wait...</p>
        </div>
      )}

      <MasonryGrid
        images={images}
        setDeleteIndex={setDeleteIndex}
        setShowPasswordModal={setShowPasswordModal}
        setFullImage={setFullImage}
      />

      {showPasswordModal && (
        <PasswordModal
          correctPassword={DELETE_PASSWORD}
          onCancel={() => {
            setShowPasswordModal(false);
            setDeleteIndex(null);
          }}
          onConfirm={handleDeleteConfirmed}
        />
      )}

      {fullImage && (
        <FullImageModal
          image={fullImage}
          onClose={() => setFullImage(null)}
          onDeleteRequest={() => {
            setDeleteIndex(images.findIndex((i) => i.id === fullImage.id));
            setShowPasswordModal(true);
          }}
        />
      )}
    </div>
  );
}
