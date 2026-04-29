"use client";
import { useEffect, useState } from "react";
import LeadTable from "@/components/LeadTable";
import Navbar from "@/components/Navbar";
export default function AgentDashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-black">My Assigned Leads</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <LeadTable leads={leads} />
      </div>
    </div>
  );
}