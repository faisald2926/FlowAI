
import React from 'react';

const DashboardHeader: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
             <WaterDropIcon className="h-8 w-8 text-blue-500" />
            <span className="ml-3 text-2xl font-bold text-slate-800">My Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                <BellIcon className="h-6 w-6 text-slate-500 hover:text-blue-500 cursor-pointer"/>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>
            <div className="text-right">
                <div className="font-semibold text-slate-800">Jane Doe</div>
                <div className="text-sm text-slate-500">Welcome back!</div>
            </div>
            <img className="h-12 w-12 rounded-full" src="https://picsum.photos/100/100" alt="User Avatar" />
            <button
              onClick={onLogout}
              className="bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-full hover:bg-slate-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const WaterDropIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" />
    </svg>
);

const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
);

export default DashboardHeader;
