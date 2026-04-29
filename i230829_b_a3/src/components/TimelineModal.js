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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white border p-6 max-w-md w-full max-h-[80vh] overflow-y-auto rounded">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
          <h2 className="font-semibold text-base">Activity Timeline</h2>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>

        <div className="space-y-4">
          {logs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No history found for this lead.</p>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="border-l border-gray-200 pl-4 py-2">
                <p className="text-xs text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
                <p className="text-sm font-semibold text-black">{log.action}</p>
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