"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Navbar from "@/components/Navbar";
import LeadTable from "@/components/LeadTable";

export default function AgentDashboard() {
  const { data: session } = useSession();
  const [leads, setLeads] = useState([]);

  // 1. Define fetchLeads INSIDE the component
  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      // Ensure we handle cases where data might not be an array
      setLeads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    }
  };

  useEffect(() => {
    // 2. Now fetchLeads is defined and can be called safely
    fetchLeads();

    if (session?.user?.id) {
      const socket = io();

      // Join personal room for real-time updates
      socket.emit("join", session.user.id);

      // Listen for new assignments
      socket.on("new_lead", (data) => {
        alert("🔔 " + data.message);
        fetchLeads(); // Refresh table automatically
      });

      return () => socket.disconnect();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-transparent p-8">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold my-6 text-black uppercase tracking-wider">
          My Assigned Leads
        </h1>
        
        {/* Pass isAdmin={false} to hide Admin-only buttons */}
        <LeadTable leads={leads} onUpdate={fetchLeads} isAdmin={false} />
      </div>
    </div>
  );
}