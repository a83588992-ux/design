import React from 'react';
import { footerContent } from '../data/mockData';
import { Phone, Mail, ShieldAlert } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative">
      {/* Curved green wave top */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: '60px' }}>
          <path d="M0 150V100C120 60 360 0 600 20C840 40 1080 100 1320 100C1380 100 1410 95 1440 90V150H0Z" fill="#3FAE2A"/>
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="bg-[#3FAE2A] text-white">
        <div className="max-w-7xl mx-auto px-4 pt-2 sm:pt-4 pb-6 sm:pb-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left - Logo & Description */}
            <div className="flex-1 max-w-lg">
              {/* Dastak Logo */}
              <div className="mb-4 sm:mb-5">
                <img
                  src="https://customer-assets.emergentagent.com/job_dlims-punjab-clone/artifacts/21jqfc4y_dastak_landing_powered.png"
                  alt="Powered by Dastak - Doorstep Delivery of Services"
                  className="h-20 sm:h-28 object-contain"
                />
              </div>
              
              <p className="text-white text-xs sm:text-sm leading-relaxed opacity-85">
                {footerContent.description}
              </p>
            </div>

            {/* Right - Contact Info */}
            <div className="flex-shrink-0 lg:max-w-md">
              {/* Government Logos Row */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6">
                    <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.3"/>
                    <text x="12" y="10" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">GOVT</text>
                    <text x="12" y="15" textAnchor="middle" fill="white" fontSize="3.5">PUNJAB</text>
                  </svg>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6">
                    <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.3"/>
                    <text x="12" y="13" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="bold">CM</text>
                  </svg>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6">
                    <circle cx="12" cy="8" r="4" fill="white" fillOpacity="0.5"/>
                    <path d="M4 20 Q12 14 20 20" fill="white" fillOpacity="0.3"/>
                  </svg>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6">
                    <circle cx="12" cy="8" r="4" fill="white" fillOpacity="0.5"/>
                    <path d="M4 20 Q12 14 20 20" fill="white" fillOpacity="0.3"/>
                  </svg>
                </div>
              </div>

              <div className="mb-4 sm:mb-5">
                <h4 className="font-semibold text-xs sm:text-sm">For driving license-related queries,</h4>
                <p className="text-xs sm:text-sm opacity-80">Please contact us at</p>
              </div>

              <div className="space-y-3">
                <a href="tel:15" className="flex items-center gap-2.5 sm:gap-3 text-white hover:opacity-80 transition-opacity group">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
                    <ShieldAlert size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Emergency Number : 15</span>
                </a>
                <a href="tel:042-99202892" className="flex items-center gap-2.5 sm:gap-3 text-white hover:opacity-80 transition-opacity group">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
                    <Phone size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Phone Number: 042-99202892</span>
                </a>
                <a href="mailto:info@dlims.punjab.gov.pk" className="flex items-center gap-2.5 sm:gap-3 text-white hover:opacity-80 transition-opacity group">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
                    <Mail size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Email: info@dlims.punjab.gov.pk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 sm:mt-10 pt-4 sm:pt-5 border-t border-white/20 text-center">
            <p className="text-xs sm:text-sm opacity-75">
              © {new Date().getFullYear()} DLIMS - Powered by Dastak. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
