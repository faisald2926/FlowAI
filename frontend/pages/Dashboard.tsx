

import React from 'react';
import { BarChart, AreaChart, LineChart } from 'recharts';
import DashboardHeader from '../components/DashboardHeader';
import DailyConsumptionChart from '../components/DailyConsumptionChart';
import ConsumptionChart from '../components/ConsumptionChart';
import LeakAlert from '../components/LeakAlert';
import AITips from '../components/AITips';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader onLogout={onLogout} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
             <LeakAlert hasLeak={true} />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
             <DailyConsumptionChart />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
             <ConsumptionChart />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <AITips />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;