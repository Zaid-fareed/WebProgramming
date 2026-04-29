"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AnalyticsCharts({ data }) {
  const priorityData = data?.priorityStats?.map(item => ({
    name: item._id,
    count: item.count
  })) || [];

  return (
    <div className="mb-6 border border-gray-200 p-4 rounded">
      <h3 className="text-sm font-semibold text-black mb-4 uppercase tracking-wide text-center">
        Lead Priority Distribution (PKR Budget Logic)
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priorityData}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: '#000' }}
              tick={{ fill: '#000', fontSize: 12, fontWeight: 'bold' }}
            />
            <YAxis
              axisLine={{ stroke: '#000' }}
              tick={{ fill: '#000', fontSize: 12 }}
              allowDecimals={false}
            />
            <Bar
              dataKey="count"
              fill="#000"
              radius={[2, 2, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}