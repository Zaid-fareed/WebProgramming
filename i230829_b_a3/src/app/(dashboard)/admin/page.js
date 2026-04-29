"use client";
import { useEffect, useState } from "react";
import LeadTable from "@/components/LeadTable";
import AddLeadForm from "@/components/AddLeadForm";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(Array.isArray(data) ? data : []));
  }, []);

  const handleLeadAdded = (newLead) => {
    setLeads([newLead, ...leads]);
  };

  const totalLeads = leads.length;
  const highPriority = leads.filter(l => l.score === "High").length;
  const closedLeads = leads.filter(l => l.status === "Closed").length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm uppercase font-bold">Total Leads</h2>
          <p className="text-3xl font-bold text-black">{totalLeads}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow border-l-4 border-red-500">
          <h2 className="text-gray-500 text-sm uppercase font-bold">High Priority</h2>
          <p className="text-3xl font-bold text-black">{highPriority}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow border-l-4 border-green-500">
          <h2 className="text-gray-500 text-sm uppercase font-bold">Closed Deals</h2>
          <p className="text-3xl font-bold text-black">{closedLeads}</p>
        </div>
      </div>

      <AddLeadForm onLeadAdded={handleLeadAdded} />

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-black">All Leads Overview</h2>
        <LeadTable leads={leads} />
      </div>
    </div>
  );
}