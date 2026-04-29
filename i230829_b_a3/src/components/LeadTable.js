"use client";

export default function LeadTable({ leads }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b p-3 font-semibold text-gray-700">Name</th>
            <th className="border-b p-3 font-semibold text-gray-700">Property Interest</th>
            <th className="border-b p-3 font-semibold text-gray-700">Status</th>
            <th className="border-b p-3 font-semibold text-gray-700">Priority</th>
            <th className="border-b p-3 font-semibold text-gray-700">Budget</th>
            <th className="border-b p-3 font-semibold text-gray-700">Agent</th>
            <th className="border-b p-3 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50">
              <td className="border-b p-3 text-black">{lead.name}</td>
              <td className="border-b p-3 text-black">{lead.propertyInterest}</td>
              <td className="border-b p-3 text-black">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {lead.status}
                </span>
              </td>
              <td className="border-b p-3 text-black">
                <span className={`px-2 py-1 rounded text-sm ${lead.score === 'High' ? 'bg-red-100 text-red-800' : lead.score === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {lead.score}
                </span>
              </td>
              <td className="border-b p-3 text-black">{lead.budget}</td>
              <td className="border-b p-3 text-black">{lead.assignedTo?.name || "Unassigned"}</td>
              <td className="border-b p-3 text-black">
                <a 
                  href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}?text=Hello ${lead.name}, I am reaching out regarding your interest in ${lead.propertyInterest}.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-green-600 transition"
                >
                  WhatsApp
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}