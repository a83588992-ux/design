import React from 'react';
import { features } from '../data/mockData';

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-white relative" id="features">
      {/* Decorative dots */}
      <div className="absolute top-20 left-8 w-3 h-3 bg-[#3FAE2A] rounded-full opacity-20"></div>
      <div className="absolute top-40 right-12 w-2 h-2 bg-[#c8a84e] rounded-full opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <span className="text-[#3FAE2A] text-xs sm:text-sm font-semibold uppercase tracking-wider">FEATURES</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mt-2 mb-3 sm:mb-4">
            Dastak-Powered Processing
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-2">
            Every request you submit is processed securely and systematically through the official
            <br className="hidden sm:block" />
            <span className="font-semibold text-gray-700"> Dastak - One Window for all Government Services</span>
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group cursor-default"
            >
              {/* Icon */}
              <div className="relative mx-auto mb-6 w-24 h-24">
                <div className="absolute inset-0 bg-[#f0f9ec] rounded-full group-hover:bg-[#e0f5d8] transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-14 h-14 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-14 h-14 rounded-full bg-[#3FAE2A] bg-opacity-20 flex items-center justify-center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3FAE2A" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></div>';
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#1a1a2e] mb-3 leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center mt-12 gap-2">
          <div className="w-2 h-2 bg-[#3FAE2A] rounded-full"></div>
          <div className="w-2 h-2 bg-[#3FAE2A] rounded-full opacity-50"></div>
          <div className="w-2 h-2 bg-[#3FAE2A] rounded-full opacity-25"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
