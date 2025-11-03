import React from 'react';

const CtaSection: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
          Ready to Discover Your Water Fingerprint?
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
          Join thousands of smart homes saving money and protecting our most valuable resource.
        </p>
        <div className="mt-10">
          {/*
            FINAL CORRECTED CODE:
            - The className is complete and correct.
            - The text is changed to prove it is updating.
            - The glowing animation class is GONE.
          */}
          <button
            onClick={onLogin}
            className="bg-blue-500 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
          >
            IT IS FIXED NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;