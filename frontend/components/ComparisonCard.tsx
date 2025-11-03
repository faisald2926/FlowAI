
import React from 'react';

interface ComparisonCardProps {
  userUsage: number;
  averageUsage: number;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ userUsage, averageUsage }) => {
  const difference = Math.abs(userUsage - averageUsage);
  const isBelowAverage = userUsage < averageUsage;
  const percentageDiff = Math.round((difference / averageUsage) * 100);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Community Comparison</h3>
      <p className="text-slate-500 mb-4">Your usage vs. similar homes.</p>
      <div className="flex justify-around items-center text-center">
        <div>
          <p className="text-slate-500 text-sm">You</p>
          <p className="text-3xl font-bold text-blue-500">{userUsage}L</p>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Average</p>
          <p className="text-3xl font-bold text-slate-600">{averageUsage}L</p>
        </div>
      </div>
      <div className={`mt-4 p-3 rounded-lg flex items-center ${isBelowAverage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isBelowAverage ? <ArrowDownIcon className="h-5 w-5 mr-2" /> : <ArrowUpIcon className="h-5 w-5 mr-2" />}
        <span className="font-semibold">
          {isBelowAverage 
            ? `You're using ${percentageDiff}% less than average!` 
            : `You're using ${percentageDiff}% more than average.`}
        </span>
      </div>
    </div>
  );
};


const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
    </svg>
);

const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
    </svg>
);


export default ComparisonCard;
