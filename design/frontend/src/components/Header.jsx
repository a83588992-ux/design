import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../data/mockData';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] py-1.5 sm:py-2 px-3 sm:px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
          <span className="text-white text-[10px] sm:text-xs tracking-wide hidden sm:inline">All DLIMS services are Powered by</span>
          <span className="text-white text-[10px] sm:hidden">Powered by</span>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 40 40" className="text-[#3FAE2A] sm:w-6 sm:h-6">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#3FAE2A" strokeWidth="2"/>
              <text x="20" y="25" textAnchor="middle" fill="#3FAE2A" fontSize="14" fontWeight="bold">D</text>
            </svg>
            <span className="text-[#c8a84e] font-bold text-xs sm:text-sm">Dastak</span>
          </div>
          <span className="text-white font-bold text-[10px] sm:text-xs tracking-wider">ONE WINDOW FOR ALL SERVICES</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-2 sm:py-3 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* DLIMS Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#3FAE2A] flex items-center justify-center bg-white flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                  <circle cx="12" cy="12" r="10" stroke="#3FAE2A" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="12" r="6" stroke="#3FAE2A" strokeWidth="1" fill="none"/>
                  <circle cx="12" cy="12" r="2" fill="#3FAE2A"/>
                  <line x1="12" y1="2" x2="12" y2="6" stroke="#3FAE2A" strokeWidth="1.5"/>
                  <line x1="12" y1="18" x2="12" y2="22" stroke="#3FAE2A" strokeWidth="1.5"/>
                  <line x1="2" y1="12" x2="6" y2="12" stroke="#3FAE2A" strokeWidth="1.5"/>
                  <line x1="18" y1="12" x2="22" y2="12" stroke="#3FAE2A" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg text-[#1a3a1a] tracking-wide">DLIMS</span>
                <p className="text-[7px] sm:text-[8px] text-gray-500 leading-tight -mt-0.5">Driving License Information<br/>Management System</p>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-300 mx-1 hidden md:block"></div>

            {/* Dastak Logo */}
            <div className="hidden md:flex items-center">
              <img
                src="https://customer-assets.emergentagent.com/job_dlims-punjab-clone/artifacts/om2jbley_dastak_landing_powered.png"
                alt="Powered by Dastak"
                className="h-10 object-contain"
              />
            </div>

            <div className="h-8 w-px bg-gray-300 mx-1 hidden lg:block"></div>

            <div className="hidden lg:block">
              <span className="text-[#c8a84e] font-bold text-[10px] tracking-wide leading-tight whitespace-nowrap">ONE WINDOW FOR ALL<br/>GOVERNMENT SERVICES</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item, index) => {
              if (item.label === 'Verify License') {
                return (
                  <Link
                    key={index}
                    to="/verify-license"
                    className="px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md whitespace-nowrap text-gray-700 hover:text-[#3FAE2A]"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md whitespace-nowrap ${
                    item.active
                      ? 'text-[#3FAE2A] font-semibold'
                      : item.highlighted
                      ? 'text-[#1a3a1a] font-semibold border border-gray-300 rounded-full px-4'
                      : 'text-gray-700 hover:text-[#3FAE2A]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <Link
              to="/admin"
              className="ml-2 bg-[#3FAE2A] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#2E7D32] transition-colors duration-200 shadow-md"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                if (item.label === 'Verify License') {
                  return (
                    <Link
                      key={index}
                      to="/verify-license"
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.active ? 'text-[#3FAE2A] bg-green-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
              <Link
                to="/admin"
                className="mx-4 mt-2 bg-[#3FAE2A] text-white px-6 py-2 rounded-full text-sm font-semibold text-center hover:bg-[#2E7D32] transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
