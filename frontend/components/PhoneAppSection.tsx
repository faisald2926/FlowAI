import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'M', usage: 80 },
  { name: 'T', usage: 60 },
  { name: 'W', usage: 90 },
  { name: 'T', usage: 50 },
  { name: 'F', usage: 70 },
];

const PhoneAppSection: React.FC = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="h-auto">
            {/* Phone Mockup */}
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl shadow-blue-500/30">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                    {/* App Screen Content */}
                    <div className="p-4 space-y-3 h-full overflow-y-auto">
                        {/* Header */}
                         <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-500">Welcome Back</p>
                                <p className="font-bold text-slate-800">Jane Doe</p>
                            </div>
                            <img className="h-8 w-8 rounded-full" src="https://picsum.photos/100/100" alt="User Avatar" />
                        </div>

                        {/* Leak Alert */}
                        <div className="bg-red-100 border border-red-200 text-red-800 px-3 py-2 rounded-lg flex items-center text-xs">
                            <WarningIcon className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />
                            <div>
                                <p className="font-bold">Leak Detected!</p>
                                <p className="text-red-700">Unusual activity at 3:15 AM.</p>
                            </div>
                        </div>

                         {/* Goal Donut */}
                        <div className="bg-blue-50 p-3 rounded-xl text-center">
                            <p className="text-sm font-bold text-blue-900">Daily Goal</p>
                            <p className="text-3xl font-extrabold text-blue-500">85%</p>
                            <p className="text-xs text-blue-700">170L of 200L used</p>
                        </div>


                        {/* Mini Chart */}
                        <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="font-bold text-slate-700 text-sm mb-1">Consumption</p>
                            <div className="h-24 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: -10 }}>
                                    <Bar dataKey="usage" radius={[4, 4, 0, 0]}>
                                        {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.usage > 75 ? "#3b82f6" : "#93c5fd"} />
                                        ))}
                                    </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* Quick Stats */}
                         <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <p className="font-bold text-green-600 text-lg">Top 15%</p>
                                <p className="text-xs text-slate-500">Community Rank</p>
                            </div>
                             <div className="bg-slate-50 p-3 rounded-xl">
                                <p className="font-bold text-slate-800 text-lg">$23.50</p>
                                <p className="text-xs text-slate-500">Saved This Month</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="pl-8">
          <h2 className="text-4xl font-extrabold text-slate-900">All Your Data, in Your Pocket</h2>
          <p className="mt-4 text-lg text-slate-600">
            With the FlowAI mobile app, you have complete control anytime, anywhere. Receive instant leak alerts, check your daily progress, and get AI-powered tips, all from the palm of your hand.
          </p>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>Stay informed with real-time push notifications.</span>
            </li>
             <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>Track your historical usage with interactive charts.</span>
            </li>
             <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>Adjust goals and settings on the go.</span>
            </li>
          </ul>
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

export default PhoneAppSection;