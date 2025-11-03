import React, { useState, useEffect } from 'react';

const WaterDropIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" />
  </svg>
);


const Header: React.FC<{ onLogin: () => void; onNavigateToLearnMore: () => void; }> = ({ onLogin, onNavigateToLearnMore }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <WaterDropIcon className="h-8 w-8 text-blue-500" />
            <span className="ml-3 text-2xl font-bold text-slate-800">FlowAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-blue-500 transition-colors">Features</a>
            <button onClick={onNavigateToLearnMore} className="text-slate-600 hover:text-blue-500 transition-colors">How it works</button>
            <a href="#" className="text-slate-600 hover:text-blue-500 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center">
            <button
              onClick={onLogin}
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;