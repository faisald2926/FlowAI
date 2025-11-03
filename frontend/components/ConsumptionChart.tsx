import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sun', 'Your Usage': 140, 'Average Usage': 170 },
  { name: 'Mon', 'Your Usage': 130, 'Average Usage': 180 },
  { name: 'Tue', 'Your Usage': 125, 'Average Usage': 175 },
  { name: 'Wed', 'Your Usage': 135, 'Average Usage': 185 },
  { name: 'Thu', 'Your Usage': 150, 'Average Usage': 170 },
  { name: 'Fri', 'Your Usage': 190, 'Average Usage': 190 },
  { name: 'Sat', 'Your Usage': 210, 'Average Usage': 220 },
];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Find payload for each data key to handle potential reordering
      const usagePayload = payload.find(p => p.dataKey === 'Your Usage');
      const avgPayload = payload.find(p => p.dataKey === 'Average Usage');

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
          <p className="font-bold text-slate-800">{`${label}`}</p>
          {usagePayload && <p className="text-blue-500">{`Your Usage : ${usagePayload.value}L`}</p>}
          {avgPayload && <p className="text-slate-500">{`Average Usage : ${avgPayload.value}L`}</p>}
        </div>
      );
    }
  
    return null;
  };
  

const ConsumptionChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-[450px]">
      <h3 className="text-2xl font-bold text-slate-800 mb-4">Weekly Consumption</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5, right: 20, left: -10, bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: '#64748b' }} stroke="#cbd5e1" axisLine={false} tickLine={false}/>
          <YAxis unit="L" tick={{ fill: '#64748b' }} stroke="#cbd5e1" axisLine={false} tickLine={false}/>
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(203, 213, 225, 0.4)' }} />
          <Legend wrapperStyle={{paddingTop: '30px'}}/>
          <Bar dataKey="Your Usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Average Usage" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConsumptionChart;