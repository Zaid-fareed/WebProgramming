"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AnalyticsCharts({ data }) {
  // Mapping priority stats (High/Medium/Low) to the graph
  const priorityData = data?.priorityStats?.map(item => ({ 
    name: item._id, 
    count: item.count 
  })) || [];

  return (
    <div className="mb-8 border border-gray-300 p-6 rounded bg-transparent">
      <h3 className="text-sm font-bold text-black mb-6 uppercase tracking-widest text-center">
        Lead Priority Distribution (PKR Budget Logic)
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priorityData}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#ccc" />
            <XAxis 
              dataKey="name" 
              axisLine={{stroke: '#000'}} 
              tick={{fill: '#000', fontSize: 12, fontWeight: 'bold'}} 
            />
            <YAxis 
              axisLine={{stroke: '#000'}} 
              tick={{fill: '#000', fontSize: 12}} 
              allowDecimals={false}
            />
            <Bar 
              dataKey="count" 
              fill="#000000" 
              radius={[2, 2, 0, 0]} 
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}