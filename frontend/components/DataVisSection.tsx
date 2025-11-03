import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', usage: 150, avg: 180 },
  { name: 'Tue', usage: 130, avg: 175 },
  { name: 'Wed', usage: 190, avg: 185 },
  { name: 'Thu', usage: 120, avg: 170 },
  { name: 'Fri', usage: 160, avg: 190 },
  { name: 'Sat', usage: 210, avg: 220 },
];

const DataVisSection: React.FC = () => {
  return (
    <section id="visuals" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="pr-8">
          <h2 className="text-4xl font-extrabold text-slate-900">Visualize Your Impact</h2>
          <p className="mt-4 text-lg text-slate-600">
            Our intuitive dashboard brings your data to life. Easily track your daily, weekly, and monthly consumption. Spot trends, identify savings opportunities, and see your progress towards your goals in beautiful, easy-to-read charts.
          </p>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>Gain clarity with beautiful, simple visualizations.</span>
            </li>
             <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>Compare your usage against community averages.</span>
            </li>
             <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>Receive AI-powered insights to help you save more.</span>
            </li>
          </ul>
        </div>
        <div className="h-auto p-2 rounded-2xl shadow-2xl shadow-blue-500/20 bg-slate-50/70 border border-slate-200 transform md:rotate-3 transition hover:rotate-0">
          <div className="bg-white rounded-xl p-4 space-y-4">
              {/* Mock Leak Alert */}
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded-md flex items-center text-sm">
                <WarningIcon className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Potential Leak Detected!</h4>
                  <p className="text-yellow-700 text-xs">Unusual activity detected at 3:15 AM.</p>
                </div>
              </div>

              {/* Mock Chart */}
              <div className="h-60 w-full">
                <h3 className="font-bold text-slate-700 mb-2">Weekly Consumption</h3>
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="L" />
                      <Tooltip wrapperStyle={{ fontSize: '12px', padding: '8px', border: 'none', borderRadius: '8px' }} />
                      <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Your Usage"/>
                      <Bar dataKey="avg" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Average"/>
                    </BarChart>
                  </ResponsiveContainer>
              </div>

              {/* Mock Goals */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-600 text-sm">Daily Goal</h4>
                      <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-bold text-blue-500">85%</span>
                        <span className="text-xs text-slate-500 ml-1">of 200L</span>
                      </div>
                  </div>
                   <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-600 text-sm">Community Rank</h4>
                       <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-bold text-green-500">Top 15%</span>
                        <span className="text-xs text-slate-500 ml-1">in your area</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
);

export default DataVisSection;