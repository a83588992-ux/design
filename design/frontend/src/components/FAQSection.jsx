import React, { useState } from 'react';
import { faqItems } from '../data/mockData';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[#3FAE2A] text-xs sm:text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mt-2">
            Frequently asked<br/>questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-[#3FAE2A] shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                  openIndex === index ? 'bg-[#3FAE2A] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {index + 1}
                </span>
                <span className="flex-1 font-semibold text-[#1a1a2e] text-xs sm:text-sm">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-[#3FAE2A]' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 pl-17">
                  <div className="ml-12">
                    {item.answer.length === 1 ? (
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.answer[0]}
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {item.answer.map((ans, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-500 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3FAE2A] flex-shrink-0 mt-2"></span>
                            <span>{ans}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
