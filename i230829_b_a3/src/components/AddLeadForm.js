"use client";
import { useState } from "react";

export default function AddLeadForm({ onLeadAdded }) {
  // 1. Ensure the state is named 'form'
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    propertyInterest: "Apartment",
    source: "Website",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budget: Number(form.budget), // Convert string to Number for the scoring logic
        }),
      });

      if (res.ok) {
        // Reset form after successful submission
        setForm({ 
          name: "", email: "", phone: "", budget: "", 
          propertyInterest: "Apartment", source: "Website", notes: "" 
        });
        onLeadAdded(); // Refresh the table
      } else {
        const errorData = await res.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <h3 className="col-span-full text-lg font-bold text-gray-700 border-b pb-2">Add New Property Lead</h3>
      
      <input
        type="text"
        placeholder="Client Name"
        className="p-2 border rounded text-black"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      
      <input
        type="email"
        placeholder="Email Address"
        className="p-2 border rounded text-black"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Phone (e.g. 923001234567)"
        className="p-2 border rounded text-black"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Budget (PKR)"
        className="p-2 border rounded text-black"
        value={form.budget}
        onChange={(e) => setForm({ ...form, budget: e.target.value })}
        required
      />

      <select 
        className="p-2 border rounded text-black"
        value={form.propertyInterest}
        onChange={(e) => setForm({ ...form, propertyInterest: e.target.value })}
      >
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Plot">Plot</option>
        <option value="Commercial">Commercial</option>
      </select>

      <select 
        className="p-2 border rounded text-black"
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
      >
        <option value="Website">Website</option>
        <option value="Facebook">Facebook</option>
        <option value="Instagram">Instagram</option>
        <option value="Walk-in">Walk-in</option>
      </select>

      <button
        type="submit"
        className="col-span-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Create Lead & Calculate Priority
      </button>
    </form>
  );
}