"use client";
import { useState, useEffect } from "react";

export default function LeadTable({ leads, onUpdate }) {
  const [agents, setAgents] = useState([]);

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
            <tr key={lead._id} className="hover:bg-gray-50 text-black">
              <td className="border-b p-3">{lead.name}</td>
              <td className="border-b p-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  lead.score === 'High' ? 'bg-red-100 text-red-700' : 
                  lead.score === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {lead.score}
                </span>
              </td>
              <td className="border-b p-3">{lead.budget.toLocaleString()}</td>
              <td className="border-b p-3">
                <select 
                  className="border rounded p-1 text-sm bg-gray-50"
                  value={lead.assignedTo?._id || ""}
                  onChange={(e) => handleAssign(lead._id, e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {agents.map(agent => (
                    <option key={agent._id} value={agent._id}>{agent.name}</option>
                  ))}
                </select>
              </td>
              <td className="border-b p-3 space-x-2">
                <a 
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  className="text-green-600 hover:underline font-medium"
                >
                  WhatsApp
                </a>
                <button 
                  onClick={() => handleDelete(lead._id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}