import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import DataVisSection from '../components/DataVisSection';
import HowItWorksSection from '../components/HowItWorksSection';
import PhoneAppSection from '../components/PhoneAppSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onLoginAsDemo: () => void;
  onNavigateToLearnMore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin, onLoginAsDemo, onNavigateToLearnMore }) => {
  return (
    <div className="overflow-x-hidden">
      <Header onLogin={onNavigateToLogin} onNavigateToLearnMore={onNavigateToLearnMore} />
      <main>
        <Hero onLogin={onLoginAsDemo} onNavigateToLearnMore={onNavigateToLearnMore} />
        <FeatureSection />
        <DataVisSection />
        <HowItWorksSection />
        <PhoneAppSection />
        <CtaSection onLogin={onLoginAsDemo} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;