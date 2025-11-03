import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface GoalSetterProps {
  currentGoal: number;
  dailyAverage: number;
}

const GoalSetter: React.FC<GoalSetterProps> = ({ currentGoal, dailyAverage }) => {
  const percentage = Math.round((dailyAverage / currentGoal) * 100);
  const data = [
    { name: 'goal', value: Math.min(percentage, 100), fill: '#3b82f6' }
  ];

  const getStatus = () => {
    if (percentage < 80) return { text: "You're on track!", color: 'text-green-500' };
    if (percentage <= 100) return { text: "Nearing your goal", color: 'text-yellow-500' };
    return { text: "Over your goal", color: 'text-red-500' };
  }

  const status = getStatus();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-full flex flex-col items-center justify-between text-center">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Daily Consumption Goal</h3>
        <div className="w-full h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="90%"
              data={data}
              startAngle={90}
              endAngle={-270}
              barSize={20}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: '#e2e8f0' }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-4xl font-extrabold text-blue-500">{percentage}%</span>
            <p className="text-sm text-slate-500">of goal</p>
          </div>
        </div>
        <div className="text-center my-4">
            <p className={`font-semibold ${status.color}`}>{status.text}</p>
            <p className="text-slate-600">
                <span className="font-bold">{dailyAverage}L</span> used of <span className="font-bold">{currentGoal}L</span>
            </p>
        </div>
      </div>
       <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors mt-2">
        Adjust Goal
      </button>
    </div>
  );
};

export default GoalSetter;