

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import Footer from '../components/Footer';
import CtaSection from '../components/CtaSection';

// Custom hook for scroll animations
const useScrollAnimation = () => {
    const observer = useRef<IntersectionObserver | null>(null);
    
    const animateOnScroll = useCallback((node: HTMLElement | null) => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        if (node) observer.current.observe(node);
    }, []);

    return animateOnScroll;
};


const WaterDropIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" />
    </svg>
);

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const LearnMoreHeader: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center">
                    <WaterDropIcon className="h-8 w-8 text-blue-500" />
                    <span className="ml-3 text-2xl font-bold text-slate-800">FlowAI</span>
                </div>
                <button onClick={onBack} className="flex items-center text-slate-600 hover:text-blue-500 transition-colors font-semibold">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Home
                </button>
            </div>
        </div>
    </header>
);

const AnimatedCounter: React.FC<{ target: number, duration?: number, suffix?: string, prefix?: string }> = ({ target, duration = 2000, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    const formatNumber = (num: number) => {
        if (num >= 1000000000) return (num / 1000000000).toFixed(0) + ' Billion';
        if (num >= 1000000) return (num / 1000000).toFixed(0) + ' Million';
        return num.toLocaleString();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let start = 0;
                    const end = target;
                    if (start === end) {
                        setCount(end);
                        return;
                    }

                    const totalFrames = duration / 16; // 60fps
                    const increment = end / totalFrames;

                    const counter = () => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                        } else {
                            setCount(Math.ceil(start));
                            requestAnimationFrame(counter);
                        }
                    };
                    requestAnimationFrame(counter);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{prefix}{formatNumber(count)}{suffix}</span>;
};

const normalUsageData = [
    { hour: '12am', usage: 2 }, { hour: '1am', usage: 2 }, { hour: '2am', usage: 2 }, { hour: '3am', usage: 2 }, { hour: '4am', usage: 2 }, { hour: '5am', usage: 5 },
    { hour: '6am', usage: 15 }, { hour: '7am', usage: 45 }, { hour: '8am', usage: 30 },
    { hour: '9am', usage: 10 }, { hour: '10am', usage: 8 }, { hour: '11am', usage: 8 }, { hour: '12pm', usage: 12 },
    { hour: '1pm', usage: 7 }, { hour: '2pm', usage: 7 }, { hour: '3pm', usage: 7 }, { hour: '4pm', usage: 10 },
    { hour: '5pm', usage: 15 }, { hour: '6pm', usage: 35 }, { hour: '7pm', usage: 40 },
    { hour: '8pm', usage: 15 }, { hour: '9pm', usage: 10 }, { hour: '10pm', usage: 5 }, { hour: '11pm', usage: 150 },
];

const LeakDetectionDemo = () => {
    const [isLeakView, setIsLeakView] = useState(false);
    const animateOnScroll = useScrollAnimation();

    const demoData = normalUsageData.map(d => ({
        hour: d.hour,
        'Usage': d.usage,
    }));

    const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const usage = payload[0].value;
            const color = payload[0].payload.hour === '11pm' && isLeakView ? '#ef4444' : '#3b82f6';

            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-sm">
                    <p className="font-bold text-slate-800">{`Time: ${label}`}</p>
                    <p style={{ color }}>{`Usage: ${usage}L`}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <section ref={animateOnScroll} className="py-24 bg-transparent fade-in-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900">From Pattern to Prevention</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Our AI is trained to spot the tell-tale signs of the most common leaks in the Kingdom, like faulty tank floats and running toilets, which often go unnoticed for months.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <h3 className="text-3xl font-bold text-slate-800">See FlowAI in Action</h3>
                        <p className="text-slate-600 leading-relaxed mt-2 mb-6">
                            Toggle between a normal day and a day with a detected anomaly. Notice the unusual, massive spike at 11 PM—this could be a burst pipe or a hose left on overnight. FlowAI's pattern recognition catches these deviations instantly, sending you a critical alert.
                        </p>
                        
                        <div className="flex space-x-2 p-1 rounded-full bg-slate-200 w-full sm:w-auto self-start mb-6">
                            <button onClick={() => setIsLeakView(false)} className={`w-1/2 rounded-full px-4 py-2 text-sm sm:text-base font-semibold transition-colors ${!isLeakView ? 'bg-white text-blue-600 shadow' : 'text-slate-600'}`}>Normal Day</button>
                            <button onClick={() => setIsLeakView(true)} className={`w-1/2 rounded-full px-4 py-2 text-sm sm:text-base font-semibold transition-colors ${isLeakView ? 'bg-white text-blue-600 shadow' : 'text-slate-600'}`}>Leak Detected</button>
                        </div>

                        {isLeakView && (
                             <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-lg flex items-start animate-[fade-in_0.5s_ease-out]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-red-500 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                <div>
                                    <h4 className="font-bold">Critical Alert!</h4>
                                    <p className="text-red-700 text-sm">A significant and unusual water usage spike was detected at 11:00 PM. This pattern is inconsistent with your normal fingerprint and may indicate a major leak or appliance malfunction.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-96 bg-white/70 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-slate-100 order-1 lg:order-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={demoData} 
                                margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                                barCategoryGap="20%"
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} tick={{transform: 'translate(0, 5)'}} interval={2} axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} unit="L" axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(203, 213, 225, 0.4)' }} />
                                <Bar dataKey="Usage" name="Usage" radius={[4, 4, 0, 0]}>
                                    {demoData.map((entry) => (
                                        <Cell key={`cell-${entry.hour}`} fill={isLeakView && entry.hour === '11pm' ? '#ef4444' : '#3b82f6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

const nationalImpacts = [
    {
      icon: "🌊",
      title: "Water Wasted Annually",
      value: 1000000000,
      suffix: " m³",
      description: "Around 25-30% of all produced water in the Kingdom is lost to leaks."
    },
    {
      icon: "💸",
      title: "Annual Financial Cost",
      value: 5000000000,
      prefix: "~",
      suffix: " SAR",
      description: "The estimated cost of wasted water runs into billions of Riyals each year."
    },
    {
      icon: "🏠",
      title: "Homes with Hidden Leaks",
      value: 69,
      suffix: "%",
      description: "A field study in Riyadh found that 69% of inspected homes had active leaks."
    }
];

const NationalImpactSection = () => {
    const animateOnScroll = useScrollAnimation();
    return (
        <section ref={animateOnScroll} className="py-24 bg-blue-50/50 fade-in-section">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900">A National Challenge with a Personal Solution</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Water leaks are more than just a nuisance; they represent a significant loss of a precious resource and a multi-billion Riyal financial drain annually.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {nationalImpacts.map((impact, index) => (
                    <div key={index} className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-slate-100">
                        <div className="text-6xl mb-4">{impact.icon}</div>
                        <h3 className="text-5xl font-extrabold text-indigo-600">
                            <AnimatedCounter target={impact.value} prefix={impact.prefix} suffix={impact.suffix} />
                        </h3>
                        <h4 className="text-xl font-bold text-slate-800 mt-2">{impact.title}</h4>
                        <p className="text-slate-600 mt-2">{impact.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}

const benefits = [
    {
      icon: "📉",
      title: "Reduce Consumption",
      value: 46,
      suffix: "%",
      description: "Official initiatives show that fixing internal leaks can cut your household water consumption by nearly half."
    },
    {
      icon: "💰",
      title: "Lower Your Bill",
      value: 28,
      prefix: "~",
      suffix: "%",
      description: "The 'Rashid' initiative proved addressing leaks leads to an average bill reduction of 28%."
    },
    {
      icon: "🛡️",
      title: "Prevent Costly Damage",
      value: 70,
      suffix: "%",
      description: "With nearly 70% of inspected homes having leaks, the risk is real. Get instant alerts and prevent water damage before it starts."
    }
  ];

const BenefitsSection = () => {
    const animateOnScroll = useScrollAnimation();
    return (
        <section ref={animateOnScroll} className="py-24 bg-transparent fade-in-section">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900">Take Control, See Immediate Results</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        FlowAI delivers real, verifiable savings for your wallet and the Kingdom.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-slate-100">
                        <div className="text-6xl mb-4">{benefit.icon}</div>
                        <h3 className="text-5xl font-extrabold text-blue-500">
                            <AnimatedCounter target={benefit.value} prefix={benefit.prefix} suffix={benefit.suffix} />
                        </h3>
                        <h4 className="text-xl font-bold text-slate-800 mt-2">{benefit.title}</h4>
                        <p className="text-slate-600 mt-2">{benefit.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}

const FaqItem: React.FC<{ q: string, a: string, isOpen: boolean, onClick: () => void }> = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-slate-200 py-6">
      <button onClick={onClick} className="w-full flex justify-between items-center text-left">
        <h3 className="text-lg font-semibold text-slate-800">{q}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
             <p className="pt-4 text-slate-600">{a}</p>
        </div>
      </div>
    </div>
  );

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const animateOnScroll = useScrollAnimation();
    const faqs = [
        { q: "How is FlowAI installed?", a: "FlowAI is installed on your main water line by one of our certified technicians. The process is non-invasive and typically takes less than an hour, with no need to cut pipes." },
        { q: "Is my data private and secure?", a: "Absolutely. We use end-to-end encryption to protect your data. All usage data is anonymized for community benchmarking, so your personal information is never shared." },
        { q: "What kind of leaks can it detect?", a: "FlowAI is designed to detect all types of leaks, but it's especially effective at catching the most common issues found in the Kingdom, such as faulty ground tank floats (responsible for up to 79% of leaks), toilet siphons (65%), and dripping faucets (39%)." },
        { q: "Does it work with all types of plumbing?", a: "Yes, FlowAI is compatible with all standard residential plumbing systems, including copper, PEX, and PVC pipes. Our technicians will ensure it's correctly fitted for your home." },
    ];

    return (
        <section ref={animateOnScroll} className="py-24 bg-transparent fade-in-section">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                </div>
                <div>
                    {faqs.map((faq, index) => (
                        <FaqItem 
                            key={index} 
                            q={faq.q} 
                            a={faq.a}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
};

interface LearnMorePageProps {
  onBack: () => void;
  onLogin: () => void;
}

const LearnMorePage: React.FC<LearnMorePageProps> = ({ onBack, onLogin }) => {
    const animateOnScroll = useScrollAnimation();
  return (
    <div className="overflow-x-hidden">
      <LearnMoreHeader onBack={onBack} />
      <main>
        <section className="pt-24 pb-12 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 ref={animateOnScroll} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight fade-in-section">
                        The Hidden Water Crisis
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                           in the Kingdom
                        </span>
                    </h1>
                    <p ref={animateOnScroll} className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 fade-in-section" style={{transitionDelay: '200ms'}}>
                        Official data reveals a widespread issue: up to 93% of sudden high water bills in Saudi Arabia are due to hidden internal leaks. FlowAI is your first line of defense against this silent, costly problem.
                    </p>
                </div>
            </div>
        </section>

        <LeakDetectionDemo />
        <NationalImpactSection />
        <BenefitsSection />
        <FaqSection />
        <CtaSection onLogin={onLogin} />
      </main>
      <Footer />
    </div>
  );
};

export default LearnMorePage;
