"use client";
import { useState } from "react";

export default function AddLeadForm({ onLeadAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyInterest: "",
    budget: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (res.ok) {
      const newLead = await res.json();
      onLeadAdded(newLead);
      setFormData({ name: "", email: "", phone: "", propertyInterest: "", budget: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4 text-black">Add New Lead</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="border p-2 rounded text-black" 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 rounded text-black" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Phone (e.g. 923...)" 
          className="border p-2 rounded text-black" 
          value={formData.phone} 
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Property Interest" 
          className="border p-2 rounded text-black" 
          value={formData.propertyInterest} 
          onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })} 
          required 
        />
        <input 
          type="number" 
          placeholder="Budget (PKR)" 
          className="border p-2 rounded text-black" 
          value={formData.budget} 
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })} 
          required 
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded font-semibold">
        Submit Lead
      </button>
    </form>
  );
}