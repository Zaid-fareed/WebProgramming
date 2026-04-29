"use client";
import { useEffect, useState } from "react";
import LeadTable from "@/components/LeadTable";
import AddLeadForm from "@/components/AddLeadForm";
import Navbar from "@/components/Navbar";
import AnalyticsCharts from "@/components/AnalyticsCharts";


export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(Array.isArray(data) ? data : []);
  };

  const fetchStats = async () => {
  const res = await fetch("/api/analytics");
  const data = await res.json();
  setStats(data);
  };

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);

  return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto">
              <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Command Center</h1>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
                  Total Leads: {leads.length}
                </div>
              </header>
              {stats && <AnalyticsCharts data={stats} />}
              <AddLeadForm onLeadAdded={fetchLeads} />

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Lead Inventory</h2>
                <LeadTable leads={leads} onUpdate={fetchLeads} />
              </div>
            </div>
          </div>
  );
}