import React, { useState } from 'react';

// --- Helper Icons (Included directly in the file) ---
const WaterDropIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" />
    </svg>
);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L10.5 12.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l3.75-3.75Z" clipRule="evenodd" />
    </svg>
);

// --- Props Interface (defining what functions the page needs) ---
interface SignUpPageProps {
  onSignUp: () => void;
  onNavigateToLogin: () => void;
}

// --- The Main SignUpPage Component ---
const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onNavigateToLogin }) => {
  // State to manage which step we are on
  const [step, setStep] = useState<'entering-nwc' | 'verified'>('entering-nwc');
  
  // State for the NWC part
  const [nwcAccountNumber, setNwcAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for the final account creation part
  const [fullName, setFullName] = useState('Abdullah A.'); // Default name for demo
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- Function to handle the NWC verification ---
  const handleNwcVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate a 2-second delay to feel like a real network request
    setTimeout(() => {
      // --- This is the DEMO logic ---
      // We check if the number is 10 digits and starts with "10"
      if (nwcAccountNumber && nwcAccountNumber.length === 10 && nwcAccountNumber.startsWith('10')) {
        // If it's valid, we move to the next step
        setStep('verified');
      } else {
        // If it's invalid, we show an error message
        setError('NWC account number not found. Please check the number on your bill.');
      }
      setIsLoading(false);
    }, 2000);
  };

  // --- Function to handle the final sign-up ---
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating FlowAI account with:', { fullName, email, password, nwcAccountNumber });
    // This calls the function from App.tsx to log the user in
    onSignUp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center mb-6">
            <WaterDropIcon className="h-12 w-12 text-blue-500" />
            <span className="ml-3 text-4xl font-bold text-slate-800">FlowAI</span>
        </div>
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-slate-100 backdrop-blur-lg bg-opacity-70">
          
          {/* --- STEP 1: NWC VERIFICATION FORM --- */}
          {step === 'entering-nwc' && (
            <>
              <h2 className="text-center text-3xl font-extrabold text-slate-900 mb-2">Link your Water Account</h2>
              <p className="text-center text-sm text-slate-500 mb-6">Enter your account number from your National Water Company bill.</p>
              <form className="space-y-6" onSubmit={handleNwcVerification}>
                <div>
                  <label htmlFor="nwc-account" className="block text-sm font-medium text-slate-700">
                    NWC Account Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="nwc-account"
                      name="nwc-account"
                      type="text"
                      placeholder="e.g., 1012345678"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={nwcAccountNumber}
                      onChange={(e) => setNwcAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors transform hover:-translate-y-0.5 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Account'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* --- STEP 2: CREATE FLOWAI ACCOUNT FORM --- */}
          {step === 'verified' && (
            <>
              <div className="flex items-center justify-center text-green-600 mb-4">
                <CheckCircleIcon className="h-8 w-8 mr-2"/>
                <h2 className="text-center text-2xl font-bold">NWC Account Linked!</h2>
              </div>
              <p className="text-center text-sm text-slate-500 mb-6">Welcome! Now create your FlowAI account to see your dashboard.</p>
              <form className="space-y-6" onSubmit={handleSignUp}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
                  <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                    Create Account & View Dashboard
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;