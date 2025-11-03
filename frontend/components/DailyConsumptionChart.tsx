import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentPayload = payload.find(p => p.dataKey === 'Your Consumption');
      const currentUsage = currentPayload?.value;
      
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
          {/* Format the label to be more readable */}
          <p className="font-bold text-slate-800">{`Time: ${new Date(label).toLocaleTimeString()}`}</p>
          {currentUsage !== undefined && <p style={{ color: currentPayload.fill }}>{`Consumption: ${currentUsage}L`}</p>}
        </div>
      );
    }
  
    return null;
};
  
const DailyConsumptionChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:5000/api/water_consumption')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(apiData => {
        setData(apiData.consumption);
      })
      .catch(error => {
        console.error('Error fetching consumption data:', error);
        setError('Could not load chart data. Is the backend running?');
      });
  }, []); // The empty array means this effect runs once when the component mounts

  if (error) {
    return <div className="text-red-500 p-4 bg-red-100 rounded-lg">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="p-4">Loading chart data...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-[450px]">
      <h3 className="text-2xl font-bold text-slate-800 mb-4">Today's Consumption (Live Data)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5, right: 20, left: -10, bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            tickFormatter={(timeStr) => new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            tick={{ fill: '#64748b', fontSize: 12 }} 
            stroke="#cbd5e1" 
            interval={data.length > 20 ? Math.floor(data.length / 10) : 0} // Show fewer labels if there's a lot of data
            angle={-45} 
            textAnchor="end" />
          <YAxis unit="L" tick={{ fill: '#64748b' }} stroke="#cbd5e1"/>
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(203, 213, 225, 0.4)' }} />
          <Legend wrapperStyle={{paddingTop: '30px'}}/>
          <Bar dataKey="Your Consumption" name="Your Consumption" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry['Your Consumption'] > 50 ? '#ef4444' : '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyConsumptionChart;