"use client";
import { useState, useEffect } from "react";

export default function TimelineModal({ leadId, onClose }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`/api/leads/${leadId}/activity`)
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, [leadId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-black p-6 max-w-md w-full max-h-[80vh] overflow-y-auto rounded shadow-2xl">
        <div className="flex justify-between items-center mb-4 border-b border-black pb-2">
          <h2 className="font-bold uppercase text-sm tracking-widest">Activity Timeline</h2>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>

        <div className="space-y-4">
          {logs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No history found for this lead.</p>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="border-l-2 border-black pl-4 py-1">
                <p className="text-xs font-bold text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
                <p className="text-sm font-bold text-black">{log.action}</p>
                <p className="text-sm text-gray-700">{log.details}</p>
                <p className="text-xs italic text-gray-500">By: {log.performedBy?.name || "System"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}