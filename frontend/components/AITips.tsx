import React from 'react';

const tips = [
  {
    title: "Shorter Showers",
    description: "Your data shows peak usage in the morning. Cutting just 2 minutes from your shower can save over 550 liters a month.",
    icon: "🚿"
  },
  {
    title: "Full Laundry Loads",
    description: "We noticed several small laundry cycles. Running only full loads can significantly reduce your weekly water consumption.",
    icon: "🧺"
  },
  {
    title: "Check for Toilet Leaks",
    description: "A silent toilet leak can waste hundreds of liters. Add a drop of food coloring to the tank; if it appears in the bowl, you have a leak.",
    icon: "🚽"
  }
];

const AITips: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <div className="flex items-center mb-4">
        <h3 className="text-2xl font-bold text-slate-800">AI-Powered Savings Tips</h3>
      </div>
      <p className="text-slate-600 mb-6">Based on your unique water fingerprint, here are some personalized suggestions to help you save.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
            <div className="text-4xl mb-3">{tip.icon}</div>
            <h4 className="font-bold text-lg text-blue-900 mb-2">{tip.title}</h4>
            <p className="text-blue-800 text-sm">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITips;