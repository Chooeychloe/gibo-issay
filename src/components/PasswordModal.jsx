import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function PasswordModal({ correctPassword, onCancel, onConfirm }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (input === correctPassword) {
      onConfirm();
      setInput("");
      setError("");
    } else {
      setError("Incorrect password!");
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl p-6 w-80 shadow-2xl z-[10000]">
        <h2 className="text-xl font-bold mb-4 text-center">Enter Password</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
          placeholder="Password"
        />
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleSubmit}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
