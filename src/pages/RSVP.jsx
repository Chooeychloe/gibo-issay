import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://csnwhimbfcqnymjugsom.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbndoaW1iZmNxbnltanVnc29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDc1NzksImV4cCI6MjA3OTcyMzU3OX0.exwo5xPHyjm7K913k9lMP75w-BZabXlDAWLNWHkE2y0",
);

export default function RSVP() {
  const [form, setForm] = useState({
    name: "",
    attending: "",
    guests: 1,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("rsvp").insert([
      {
        name: form.name,
        attending: form.attending,
        guests: form.attending === "yes" ? form.guests : 0,
        message: form.message,
      },
    ]);

    if (error) {
      console.error("RSVP insert error:", error);
      alert(error.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Thank you! 💍</h2>
          <p>Your RSVP has been received.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">RSVP</h1>

        <input
          name="name"
          required
          placeholder="Your Name"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <select
          name="attending"
          required
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        >
          <option value="">Will you attend?</option>
          <option value="yes">Yes, gladly 💖</option>
          <option value="no">Sorry, can’t make it</option>
        </select>

        {form.attending === "yes" && (
          <input
            type="number"
            name="guests"
            min="1"
            className="w-full p-2 border rounded mb-3"
            placeholder="Number of guests"
            onChange={handleChange}
          />
        )}

        <textarea
          name="message"
          placeholder="Message for the couple"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        />

        <button className="w-full bg-indigo-900 text-white py-2 rounded">
          Submit RSVP
        </button>
      </form>
    </div>
  );
}
