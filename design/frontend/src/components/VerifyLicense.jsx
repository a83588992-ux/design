import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Loader2, User, CreditCard, MapPin, Calendar, Users, Shield } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VerifyLicense = () => {
  const [licenseType, setLicenseType] = useState('regular');
  const [cnic, setCnic] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null); // { status: 'found'|'not_found', data: {...} }
  const [error, setError] = useState('');

  // Generate random captcha numbers
  const [captcha, setCaptcha] = useState(() => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    return { a, b, answer: a + b };
  });

  const resetCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ a, b, answer: a + b });
    setCaptchaAnswer('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!cnic.trim()) {
      setError('Please enter your CNIC number.');
      return;
    }
    if (parseInt(captchaAnswer) !== captcha.answer) {
      setError('Incorrect captcha answer. Please try again.');
      return;
    }

    setVerifying(true);
    try {
      const cleanCnic = cnic.replace(/-/g, '');
      const res = await axios.get(`${API}/licenses/verify/${cleanCnic}`);
      setResult(res.data);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    }
    setVerifying(false);
  };

  const handleReset = () => {
    setResult(null);
    setCnic('');
    setCaptchaAnswer('');
    setError('');
    resetCaptcha();
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white">
      {/* Page Title */}
      <div className="text-center pt-10 pb-6">
        <h1 className="text-3xl font-bold text-[#1a1a2e]">Verify License</h1>
        <div className="w-12 h-1 bg-[#3FAE2A] mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Show result if found */}
        {result && result.status === 'found' ? (
          <div className="max-w-3xl mx-auto">
            {/* License Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#3FAE2A] to-[#2E7D32] px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Shield size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">DLIMS - Driving License</h2>
                    <p className="text-white/80 text-xs">Government of Punjab - Verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
                  <CheckCircle2 size={16} className="text-white" />
                  <span className="text-white text-xs font-bold">VERIFIED</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Photo */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-2xl border-4 border-[#3FAE2A]/20 overflow-hidden bg-gray-100">
                      {result.data.picture_url ? (
                        <img
                          src={`${BACKEND_URL}${result.data.picture_url}`}
                          alt={result.data.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User size={40} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    {/* Status badge */}
                    <div className={`mt-3 px-4 py-1 rounded-full text-xs font-bold ${
                      isExpired(result.data.expiry_date)
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-green-50 text-green-600 border border-green-200'
                    }`}>
                      {isExpired(result.data.expiry_date) ? 'EXPIRED' : 'ACTIVE'}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <User size={12} /> Name
                      </label>
                      <p className="text-[#1a1a2e] font-semibold text-base">{result.data.name}</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <Users size={12} /> Father/Husband
                      </label>
                      <p className="text-[#1a1a2e] font-semibold text-base">{result.data.father_husband_name}</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <CreditCard size={12} /> CNIC
                      </label>
                      <p className="text-[#1a1a2e] font-semibold text-base font-mono">{result.data.cnic}</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <CreditCard size={12} /> License No
                      </label>
                      <p className="text-[#1a1a2e] font-semibold text-base font-mono">{result.data.license_no}</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <Shield size={12} /> Category
                      </label>
                      <p className="text-[#1a1a2e] font-semibold text-base">
                        <span className="bg-[#f0f9ec] text-[#3FAE2A] px-3 py-0.5 rounded-full text-sm">{result.data.license_category}</span>
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <MapPin size={12} /> City
                      </label>
                      <p className="text-[#1a1a2e] font-semibold text-base">{result.data.city}</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <Calendar size={12} /> Issue Date
                      </label>
                      <p className="text-[#1a1a2e] font-semibold text-base">{result.data.issue_date}</p>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                        <Calendar size={12} /> Expiry Date
                      </label>
                      <p className={`font-semibold text-base ${isExpired(result.data.expiry_date) ? 'text-red-600' : 'text-[#1a1a2e]'}`}>
                        {result.data.expiry_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-8 pb-6">
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Powered by DLIMS - Dastak</p>
                  <button
                    onClick={handleReset}
                    className="bg-[#3FAE2A] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#2E7D32] transition-colors"
                  >
                    Verify Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : result && result.status === 'not_found' ? (
          /* Not Found */
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-red-50 rounded-3xl p-10 border border-red-100">
              <XCircle size={56} className="text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">License Not Found</h3>
              <p className="text-gray-500 text-sm mb-6">
                No driving license record was found for CNIC: <span className="font-mono font-semibold">{cnic}</span>
              </p>
              <button
                onClick={handleReset}
                className="bg-[#3FAE2A] text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2E7D32] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left - Form */}
            <div className="flex-1 max-w-lg w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* License Type Radio Buttons */}
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="licenseType"
                      value="regular"
                      checked={licenseType === 'regular'}
                      onChange={(e) => setLicenseType(e.target.value)}
                      className="w-4 h-4 accent-[#3FAE2A]"
                    />
                    <span className="text-sm font-medium text-[#1a1a2e] group-hover:text-[#3FAE2A] transition-colors">Regular License</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="licenseType"
                      value="international"
                      checked={licenseType === 'international'}
                      onChange={(e) => setLicenseType(e.target.value)}
                      className="w-4 h-4 accent-[#3FAE2A]"
                    />
                    <span className="text-sm font-medium text-[#1a1a2e] group-hover:text-[#3FAE2A] transition-colors">International License</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="licenseType"
                      value="juvenile"
                      checked={licenseType === 'juvenile'}
                      onChange={(e) => setLicenseType(e.target.value)}
                      className="w-4 h-4 accent-[#3FAE2A]"
                    />
                    <span className="text-sm font-medium text-[#1a1a2e] group-hover:text-[#3FAE2A] transition-colors">Juvenile License</span>
                  </label>
                </div>

                {/* Enter CNIC */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
                    Enter CNIC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="CNIC without dashes. e.g., (1111122222223)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                    maxLength={13}
                  />
                </div>

                {/* Captcha */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
                    What is {captcha.a} + {captcha.b} =
                  </label>
                  <input
                    type="text"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Enter Here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full bg-[#f0a500] hover:bg-[#d99400] text-white font-bold py-3.5 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {verifying ? <Loader2 size={18} className="animate-spin" /> : null}
                  {verifying ? 'Verifying...' : 'Verify License'}
                </button>
              </form>
            </div>

            {/* Right - Illustration */}
            <div className="flex-1 flex items-start justify-center">
              <div className="bg-[#f0f4f8] rounded-2xl p-8 lg:p-10 w-full max-w-md">
                <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <circle cx="280" cy="60" r="8" fill="none" stroke="#3FAE2A" strokeWidth="1.5" opacity="0.4"/>
                  <circle cx="280" cy="60" r="3" fill="#3FAE2A" opacity="0.4"/>
                  <g transform="translate(290, 40)">
                    <path d="M0 12 Q6 0 12 12" fill="none" stroke="#f0a500" strokeWidth="1.5" opacity="0.6"/>
                    <path d="M2 10 Q6 2 10 10" fill="none" stroke="#f0a500" strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="6" cy="12" r="1.5" fill="#f0a500" opacity="0.6"/>
                  </g>
                  <g transform="translate(100, 30)">
                    <rect x="0" y="0" width="24" height="16" rx="4" fill="#e8e8e8"/>
                    <rect x="4" y="4" width="10" height="2" rx="1" fill="#bbb"/>
                    <rect x="4" y="8" width="14" height="2" rx="1" fill="#bbb"/>
                  </g>
                  <g transform="translate(130, 25)">
                    <rect x="0" y="0" width="20" height="14" rx="4" fill="#d4d4d4"/>
                    <rect x="4" y="4" width="8" height="2" rx="1" fill="#aaa"/>
                    <rect x="4" y="8" width="12" height="2" rx="1" fill="#aaa"/>
                  </g>
                  <g transform="translate(310, 55)">
                    <circle cx="8" cy="8" r="8" fill="#f0a500" opacity="0.2"/>
                    <path d="M5 6 Q8 0 11 6 L10 10 L6 10 Z" fill="#f0a500" opacity="0.5"/>
                    <line x1="6" y1="11" x2="10" y2="11" stroke="#f0a500" strokeWidth="1"/>
                  </g>
                  <g transform="translate(80, 80)">
                    <rect x="20" y="0" width="180" height="120" rx="6" fill="#2c3e50" stroke="#1a252f" strokeWidth="2"/>
                    <rect x="28" y="8" width="164" height="104" rx="2" fill="white"/>
                    <rect x="38" y="18" width="80" height="10" rx="2" fill="#f0a500" opacity="0.8"/>
                    <text x="42" y="26" fill="white" fontSize="7" fontWeight="bold">Online</text>
                    <text x="38" y="40" fill="#1a1a2e" fontSize="7" fontWeight="bold">Verification</text>
                    <rect x="130" y="18" width="40" height="50" rx="3" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="135" y="24" width="20" height="2" rx="1" fill="#ccc"/>
                    <rect x="135" y="29" width="28" height="2" rx="1" fill="#ccc"/>
                    <rect x="135" y="34" width="24" height="2" rx="1" fill="#ccc"/>
                    <circle cx="150" cy="52" r="6" fill="#f0a500" opacity="0.3"/>
                    <path d="M147 52 L149 54 L153 50" fill="none" stroke="#f0a500" strokeWidth="1.5"/>
                    <circle cx="55" cy="65" r="12" fill="#3FAE2A" opacity="0.15"/>
                    <circle cx="55" cy="65" r="8" fill="#3FAE2A" opacity="0.25"/>
                    <path d="M51 65 L54 68 L60 62" fill="none" stroke="#3FAE2A" strokeWidth="1.5"/>
                    <circle cx="80" cy="78" r="10" fill="#f0a500" opacity="0.2"/>
                    <circle cx="80" cy="75" r="4" fill="#f0a500" opacity="0.5"/>
                    <path d="M72 85 Q80 79 88 85" fill="#f0a500" opacity="0.3"/>
                    <rect x="100" y="75" width="70" height="3" rx="1" fill="#e0e0e0"/>
                    <rect x="100" y="82" width="55" height="3" rx="1" fill="#e0e0e0"/>
                    <rect x="100" y="89" width="65" height="3" rx="1" fill="#e0e0e0"/>
                    <path d="M0 120 L20 120 L10 135 L210 135 L200 120 L220 120 L215 140 L5 140 Z" fill="#d1d5db" stroke="#b0b5bc" strokeWidth="1"/>
                    <rect x="90" y="135" width="40" height="4" rx="2" fill="#b0b5bc"/>
                  </g>
                  <g transform="translate(280, 100)">
                    <rect x="0" y="0" width="45" height="80" rx="6" fill="#2c3e50" stroke="#1a252f" strokeWidth="1.5"/>
                    <rect x="4" y="8" width="37" height="60" rx="1" fill="white"/>
                    <rect x="15" y="3" width="15" height="3" rx="1.5" fill="#1a252f"/>
                    <rect x="14" y="72" width="17" height="3" rx="1.5" fill="#555"/>
                    <rect x="8" y="14" width="29" height="4" rx="1" fill="#3FAE2A" opacity="0.6"/>
                    <rect x="8" y="22" width="25" height="2" rx="1" fill="#e0e0e0"/>
                    <rect x="8" y="27" width="20" height="2" rx="1" fill="#e0e0e0"/>
                    <circle cx="22" cy="42" r="8" fill="#f0a500" opacity="0.2"/>
                    <path d="M19 42 L21 44 L25 40" fill="none" stroke="#f0a500" strokeWidth="1.5"/>
                    <rect x="8" y="55" width="29" height="8" rx="2" fill="#3FAE2A" opacity="0.3"/>
                  </g>
                  <g transform="translate(140, 195)">
                    <circle cx="12" cy="12" r="12" fill="#1a1a2e"/>
                    <polygon points="10,7 18,12 10,17" fill="white"/>
                  </g>
                  <g transform="translate(110, 210)">
                    <circle cx="10" cy="10" r="10" fill="#3FAE2A"/>
                    <path d="M6 10 L9 13 L14 7" fill="none" stroke="white" strokeWidth="2"/>
                  </g>
                  <g transform="translate(270, 195)">
                    {[0,1,2,3,4].map((i) => (
                      <polygon key={i} points={`${i*14+6},2 ${i*14+8},8 ${i*14+14},8 ${i*14+9},12 ${i*14+11},18 ${i*14+6},14 ${i*14+1},18 ${i*14+3},12 ${i*14-2},8 ${i*14+4},8`} fill="#f0a500" opacity="0.8"/>
                    ))}
                  </g>
                  <g transform="translate(40, 100)">
                    <rect x="0" y="0" width="30" height="38" rx="3" fill="white" stroke="#e0e0e0" strokeWidth="1" transform="rotate(-10, 15, 19)"/>
                    <rect x="5" y="8" width="15" height="2" rx="1" fill="#f0a500" opacity="0.5" transform="rotate(-10, 15, 19)"/>
                    <rect x="5" y="13" width="20" height="2" rx="1" fill="#e0e0e0" transform="rotate(-10, 15, 19)"/>
                    <rect x="5" y="18" width="12" height="2" rx="1" fill="#e0e0e0" transform="rotate(-10, 15, 19)"/>
                  </g>
                  <g transform="translate(55, 55)">
                    <path d="M0 8 L0 30 L35 30 L35 8 L18 8 L15 4 L0 4 Z" fill="#f0a500" opacity="0.6" rx="2"/>
                    <rect x="0" y="10" width="35" height="20" rx="2" fill="#f0a500" opacity="0.4"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyLicense;
