"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Agent" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-black">Create Account</h2>
        <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded text-black" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded text-black" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded text-black" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select className="w-full p-2 mb-4 border rounded text-black" onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="Agent">Agent</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}