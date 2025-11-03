import React from 'react';

const WaterDropIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" />
    </svg>
  );

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Solutions</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Leak Detection</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Goal Setting</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Analytics</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Insights</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Guides</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-slate-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Jobs</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Claim</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-base text-slate-400 hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center">
            <WaterDropIcon className="h-8 w-8 text-blue-400" />
            <span className="ml-3 text-xl font-bold">FlowAI</span>
          </div>
          <p className="mt-4 sm:mt-0 text-base text-slate-400">&copy; 2024 FlowAI, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
