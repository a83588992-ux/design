import React from 'react';
import { aboutContent } from '../data/mockData';

const AboutSection = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#fafffe]" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
          {/* Left - Illustration */}
          <div className="flex-1 relative">
            {/* Decorative circle */}
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#f0f9ec] rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#fef9e7] rounded-full opacity-60"></div>
            
            <div className="relative z-10">
              <img
                src={aboutContent.image}
                alt="About DLIMS"
                className="w-full max-w-md mx-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full max-w-md mx-auto bg-gradient-to-br from-[#f0f9ec] to-[#e8f5e0] rounded-3xl p-12 flex items-center justify-center min-h-[350px]">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle cx="100" cy="80" r="30" fill="#3FAE2A" opacity="0.3"/>
                        <circle cx="100" cy="80" r="20" fill="#3FAE2A" opacity="0.5"/>
                        <path d="M70 120 Q100 140 130 120 Q130 170 100 180 Q70 170 70 120" fill="#3FAE2A" opacity="0.2"/>
                        <circle cx="60" cy="60" r="8" fill="#ffd700" opacity="0.6"/>
                        <circle cx="140" cy="60" r="6" fill="#3FAE2A" opacity="0.4"/>
                        <rect x="80" y="50" width="40" height="5" rx="2" fill="#3FAE2A" opacity="0.3"/>
                        <rect x="85" y="58" width="30" height="3" rx="1" fill="#3FAE2A" opacity="0.2"/>
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-[#3FAE2A] text-xs sm:text-sm font-semibold uppercase tracking-wider">ABOUT US</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mt-2 sm:mt-3 mb-4 sm:mb-6 leading-tight">
              About Dlims -<br/>
              Powered<br/>
              by Dastak
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              {aboutContent.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
