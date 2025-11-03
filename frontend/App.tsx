import React, { useState, useCallback } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LearnMorePage from './pages/LearnMorePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // Import the new SignUpPage

// Add 'signup' to the Page type
type Page = 'landing' | 'learn-more' | 'login' | 'signup';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>('landing');

  // This function will handle both login and sign-up success
  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setPage('landing');
  }, []);
  
  const navigateToLearnMore = useCallback(() => {
    setPage('learn-more');
    window.scrollTo(0, 0);
  }, []);

  const navigateToLanding = useCallback(() => {
    setPage('landing');
    window.scrollTo(0, 0);
  }, []);

  const navigateToLogin = useCallback(() => {
    setPage('login');
    window.scrollTo(0, 0);
  }, []);

  // New navigation function for the sign-up page
  const navigateToSignUp = useCallback(() => {
    setPage('signup');
    window.scrollTo(0, 0);
  }, []);

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  switch (page) {
    case 'learn-more':
      return <LearnMorePage onBack={navigateToLanding} onLogin={handleLogin} />;
    case 'login':
      // Pass the new navigateToSignUp function to the LoginPage
      return <LoginPage onLogin={handleLogin} onBack={navigateToLanding} onNavigateToSignUp={navigateToSignUp} />;
    case 'signup': // New case for SignUpPage
      return <SignUpPage onSignUp={handleLogin} onNavigateToLogin={navigateToLogin} />;
    case 'landing':
    default:
      return <LandingPage onNavigateToLogin={navigateToLogin} onLoginAsDemo={handleLogin} onNavigateToLearnMore={navigateToLearnMore} />;
  }
};

export default App;