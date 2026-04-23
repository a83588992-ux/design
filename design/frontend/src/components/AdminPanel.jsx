import React, { useState, useEffect, useRef } from 'react';
import { Upload, Save, Trash2, User, CreditCard, MapPin, Calendar, Users, Shield, ChevronDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const licenseCategories = [
  'Motorcycle (M/C)',
  'Motor Car (M/CAR)',
  'LTV (Light Transport Vehicle)',
  'HTV (Heavy Transport Vehicle)',
  'PSV (Public Service Vehicle)',
  'M/C + M/CAR',
  'M/C + LTV',
  'M/C + HTV',
  'LTV + HTV',
  'All Categories',
];

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    license_no: '',
    cnic: '',
    name: '',
    father_husband_name: '',
    license_category: '',
    city: '',
    issue_date: '',
    expiry_date: '',
  });
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/licenses`);
      setLicenses(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch licenses', err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => setPicturePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.license_no || !formData.cnic || !formData.name || !formData.father_husband_name || !formData.license_category || !formData.city || !formData.issue_date || !formData.expiry_date) {
      setMessage({ type: 'error', text: 'Please fill all required fields.' });
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('license_no', formData.license_no);
      fd.append('cnic', formData.cnic.replace(/-/g, ''));
      fd.append('name', formData.name);
      fd.append('father_husband_name', formData.father_husband_name);
      fd.append('license_category', formData.license_category);
      fd.append('city', formData.city);
      fd.append('issue_date', formData.issue_date);
      fd.append('expiry_date', formData.expiry_date);
      if (picture) {
        fd.append('picture', picture);
      }

      await axios.post(`${API}/licenses`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: 'License record saved successfully!' });
      setFormData({
        license_no: '',
        cnic: '',
        name: '',
        father_husband_name: '',
        license_category: '',
        city: '',
        issue_date: '',
        expiry_date: '',
      });
      setPicture(null);
      setPicturePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchLicenses();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save license record. Please try again.' });
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this license record?')) return;
    try {
      await axios.delete(`${API}/licenses/${id}`);
      setMessage({ type: 'success', text: 'License record deleted.' });
      fetchLicenses();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete record.' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Manage driving license records</p>
          <div className="w-16 h-1 bg-[#3FAE2A] mt-3 rounded-full"></div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-8">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-2">
            <Shield size={22} className="text-[#3FAE2A]" />
            Add License Record
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Picture Upload - Full column on mobile, left on desktop */}
              <div className="lg:row-span-2 flex flex-col items-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-36 h-36 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#3FAE2A] hover:bg-green-50 transition-all duration-200 overflow-hidden"
                >
                  {picturePreview ? (
                    <img src={picturePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload size={28} className="text-gray-400 mb-2" />
                      <span className="text-xs text-gray-400 text-center px-2">Upload Photo</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="hidden"
                />
                <span className="text-xs text-gray-400 mt-2">Click to upload avatar</span>
              </div>

              {/* License No */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <CreditCard size={14} className="text-[#3FAE2A]" /> License No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="license_no"
                  value={formData.license_no}
                  onChange={handleChange}
                  placeholder="e.g., DL-12345678"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>

              {/* CNIC */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <CreditCard size={14} className="text-[#3FAE2A]" /> CNIC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  placeholder="e.g., 3520112345678"
                  maxLength={15}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-[#3FAE2A]" /> Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>

              {/* Father/Husband Name */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <Users size={14} className="text-[#3FAE2A]" /> Father/Husband Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="father_husband_name"
                  value={formData.father_husband_name}
                  onChange={handleChange}
                  placeholder="Father/Husband Name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>

              {/* License Category */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <Shield size={14} className="text-[#3FAE2A]" /> License Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="license_category"
                  value={formData.license_category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors bg-white appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath d=\'M3 5l3 3 3-3\' stroke=\'%23666\' fill=\'none\' stroke-width=\'1.5\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  <option value="">Select Category</option>
                  {licenseCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#3FAE2A]" /> City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Lahore"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>

              {/* Issue Date */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#3FAE2A]" /> Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#3FAE2A]" /> Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3FAE2A] focus:ring-1 focus:ring-[#3FAE2A] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#3FAE2A] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#2E7D32] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Saving...' : 'Save License Record'}
              </button>
            </div>
          </form>
        </div>

        {/* Licenses Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-2">
            <CreditCard size={22} className="text-[#3FAE2A]" />
            Saved License Records
            <span className="ml-auto text-sm font-normal text-gray-400">{licenses.length} record{licenses.length !== 1 ? 's' : ''}</span>
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={28} className="animate-spin text-[#3FAE2A]" />
            </div>
          ) : licenses.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Shield size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No license records yet. Add one above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">Photo</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">License No</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">CNIC</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">Name</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">Category</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">City</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">Expiry</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-500 text-xs uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.map((lic) => (
                    <tr key={lic.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3">
                        {lic.picture_url ? (
                          <img src={`${BACKEND_URL}${lic.picture_url}`} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-[#3FAE2A]/30" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={18} className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 font-medium text-[#1a1a2e]">{lic.license_no}</td>
                      <td className="py-3 px-3 text-gray-600">{lic.cnic}</td>
                      <td className="py-3 px-3 text-gray-600">{lic.name}</td>
                      <td className="py-3 px-3">
                        <span className="bg-[#f0f9ec] text-[#3FAE2A] px-2 py-0.5 rounded-full text-xs font-semibold">{lic.license_category}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-600">{lic.city}</td>
                      <td className="py-3 px-3 text-gray-600">{lic.expiry_date}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleDelete(lic.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
