"use client";
import { useState, useEffect } from "react";
import TimelineModal from "./TimelineModal";

export default function LeadTable({ leads, onUpdate }) {
  const [agents, setAgents] = useState([]);
  // This state controls which lead's history we are looking at
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  // Fetch agents for the assignment dropdown
  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data) => setAgents(Array.isArray(data) ? data : []));
  }, []);

  const handleAssign = async (leadId, agentId) => {
    const res = await fetch(`/api/leads/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedTo: agentId }),
    });
    if (res.ok) onUpdate();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) onUpdate();
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b p-3 font-semibold text-gray-700">Name</th>
            <th className="border-b p-3 font-semibold text-gray-700">Priority</th>
            <th className="border-b p-3 font-semibold text-gray-700">Budget</th>
            <th className="border-b p-3 font-semibold text-gray-700">Assign To</th>
            <th className="border-b p-3 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50 text-black border-b border-gray-200">
              <td className="p-3 text-sm">{lead.name}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  lead.score === 'High' ? 'bg-red-100 text-red-700' : 
                  lead.score === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {lead.score}
                </span>
              </td>
              <td className="p-3 text-sm">
                {lead.budget ? lead.budget.toLocaleString() : "0"}
              </td>
              <td className="p-3">
                <select 
                  className="border border-gray-300 rounded p-1 text-xs bg-gray-50 focus:outline-none"
                  value={lead.assignedTo?._id || ""}
                  onChange={(e) => handleAssign(lead._id, e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {agents.map(agent => (
                    <option key={agent._id} value={agent._id}>{agent.name}</option>
                  ))}
                </select>
              </td>
              <td className="p-3 text-sm">
                {/* Using a div with space-x to keep everything on one line without breaking the table row height */}
                <div className="flex items-center space-x-3">
                  <a 
                    href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '') || ''}`} 
                    target="_blank" 
                    className="text-green-600 hover:text-green-800 font-medium whitespace-nowrap"
                  >
                    WhatsApp
                  </a>

                  <button 
                    onClick={() => setSelectedLeadId(lead._id)}
                    className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                  >
                    History
                  </button>

                  <button 
                    onClick={() => handleDelete(lead._id)}
                    className="text-red-500 hover:text-red-700 font-medium whitespace-nowrap"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* RENDER MODAL IF A LEAD IS SELECTED */}
      {selectedLeadId && (
        <TimelineModal 
          leadId={selectedLeadId} 
          onClose={() => setSelectedLeadId(null)} 
        />
      )}
    </div>
  );
}