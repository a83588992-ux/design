import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import DownloadSection from './components/DownloadSection';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import VerifyLicense from './components/VerifyLicense';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <DownloadSection />
        <ProcessSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

const VerifyLicensePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <VerifyLicense />
      </main>
      <Footer />
    </div>
  );
};

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      axios.get(`${API}/auth/verify?token=${token}`)
        .then(() => setAuthenticated(true))
        .catch(() => {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_email');
          setAuthenticated(false);
        })
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#3FAE2A] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {authenticated ? (
          <>
            <div className="max-w-6xl mx-auto px-4 pt-4 flex justify-end">
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
            <AdminPanel />
          </>
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-license" element={<VerifyLicensePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
