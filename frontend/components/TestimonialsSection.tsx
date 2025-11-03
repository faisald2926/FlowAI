import React from 'react';

const testimonials = [
  {
    quote: "FlowAI caught a tiny leak in our wall that we never would have found. It saved us from a potential disaster and thousands in repairs. I can't recommend it enough!",
    name: "Sarah L.",
    title: "Homeowner",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "As a property manager, FlowAI is a game-changer. I can monitor all my units from one dashboard. The peace of mind is invaluable.",
    name: "Michael B.",
    title: "Property Manager",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    quote: "I love the goal-setting feature. It's turned saving water into a fun challenge for my family. We've cut our bill by nearly 20% in just three months.",
    name: "Jessica P.",
    title: "Busy Mom of 3",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900">Loved by Homes and Businesses</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Don't just take our word for it. Here's what our customers are saying.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center animate-subtle-shine">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 border-4 border-blue-200" />
              <p className="text-slate-600 italic mb-6">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <h4 className="font-bold text-lg text-slate-800">{testimonial.name}</h4>
                <p className="text-blue-500 font-semibold">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;