import React, { useState } from 'react';
import { processSteps } from '../data/mockData';
import { UserPlus, FileText, CreditCard, BadgeCheck, Printer, Truck, ExternalLink } from 'lucide-react';

const stepIcons = {
  1: UserPlus,
  2: FileText,
  3: CreditCard,
  4: BadgeCheck,
  5: Printer,
  6: Truck,
};

const stepColors = [
  'from-[#e8f5e0] to-[#f0f9ec]',
  'from-[#fef9e7] to-[#fdf3d0]',
  'from-[#e8f5e0] to-[#f0f9ec]',
  'from-[#fef9e7] to-[#fdf3d0]',
  'from-[#e8f5e0] to-[#f0f9ec]',
  'from-[#fef9e7] to-[#fdf3d0]',
];

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState('learner');

  const tabs = [
    { key: 'learner', label: 'Learner License' },
    { key: 'regular', label: 'Regular License' },
    { key: 'international', label: 'International License' },
  ];

  const currentSteps = processSteps[activeTab] || processSteps.learner;

  return (
    <section className="py-16 lg:py-20 bg-[#fafffe] relative" id="process">
      {/* Decorative elements */}
      <div className="absolute top-16 left-10 w-4 h-4 bg-[#3FAE2A] rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-16 w-3 h-3 bg-[#c8a84e] rounded-full opacity-15"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto px-2">
          <div className="inline-flex bg-gray-100 rounded-full p-1 sm:p-1.5 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-[#3FAE2A] text-white shadow-md'
                    : 'text-gray-500 hover:text-[#3FAE2A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps - Zigzag layout */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {currentSteps.map((step, index) => {
              const Icon = stepIcons[step.step] || FileText;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.step}
                  className={`flex gap-4 items-start p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group ${
                    currentSteps.length % 2 !== 0 && index === currentSteps.length - 1 ? 'md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto' : ''
                  }`}
                >
                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stepColors[index % stepColors.length]} flex items-center justify-center group-hover:bg-[#3FAE2A] transition-all duration-300 relative`}>
                      <Icon size={22} className="text-[#3FAE2A] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[#3FAE2A] text-xs font-bold uppercase tracking-wider">STEP {step.step}</span>
                      {step.hasPayButton && (
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 bg-[#3FAE2A] text-white text-[10px] font-semibold px-3 py-0.5 rounded-full hover:bg-[#2E7D32] transition-colors shadow-sm"
                        >
                          How to Pay <ExternalLink size={9} />
                        </a>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#1a1a2e] mb-1.5 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Powered by Dastak */}
          <div className="flex justify-end mt-8 mr-4">
            <img
              src="https://dlims.punjab.gov.pk/theme_new/assets/images/dastak_landing_powered.png"
              alt="Powered by Dastak"
              className="h-20 object-contain"
              onError={(e) => {
                e.target.parentElement.innerHTML = `
                  <div class="text-right bg-white rounded-xl p-3 shadow-sm border">
                    <span class="text-[10px] text-gray-400 bg-[#3FAE2A] text-white px-2 py-0.5 rounded-full">Powered by</span>
                    <div class="text-[#3FAE2A] font-bold text-xl mt-1">Dastak</div>
                    <span class="text-[8px] text-gray-400">Doorstep Delivery of Services</span>
                  </div>
                `;
              }}
            />
          </div>
        </div>

        {/* Sub-tabs for Renew/Duplicate */}
        <div className="flex justify-center mt-8 gap-3">
          <button className="text-sm font-semibold text-[#3FAE2A] bg-[#f0f9ec] px-6 py-2 rounded-full hover:bg-[#e0f5d8] transition-colors border border-[#3FAE2A]/20">
            Renew
          </button>
          <button className="text-sm font-semibold text-gray-500 bg-gray-100 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors border border-gray-200">
            Duplicate
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
