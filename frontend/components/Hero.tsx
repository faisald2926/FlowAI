import React from 'react';

const Hero: React.FC<{ onLogin: () => void; onNavigateToLearnMore: () => void; }> = ({ onLogin, onNavigateToLearnMore }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
          Unlock Your Personal
          <br />
          <span className="relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Water Fingerprint
            </span>
          </span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-lg text-slate-600">
          FlowAI analyzes your unique water usage patterns to detect leaks instantly,
          help you save money, and contribute to a sustainable future.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onLogin}
            className="bg-blue-500 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
          >
            Get Started Now
          </button>
          <button
            onClick={onNavigateToLearnMore}
            className="bg-white text-slate-700 font-bold px-8 py-4 rounded-full text-lg hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-slate-500/20 transform hover:-translate-y-1"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;