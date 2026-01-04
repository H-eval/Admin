 import React, { useState, useEffect } from 'react';
 import { Globe } from "lucide-react";
 import api from "../api/axiosConfig";  

// Eye and Eye-slash icons for the password visibility toggle
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.11 3.558-5.548 6.818-6.195M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.582 17.582A7.95 7.95 0 0112 18c-4.477 0-8.268-2.943-9.542-7a10.025 10.025 0 013.939-5.343M3.75 3.75l16.5 16.5" />
  </svg>
);


const AddUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    userId: '',
    password: '',
    languages: [],
    education: '',
    gender: '',
    age: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLanguageList, setShowLanguageList] = useState(false);


  // A simple fade-in animation effect for the form on mount
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const token = localStorage.getItem("token");

        const res = await api.post(
          "/admin/add-user",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("✅ User added successfully!");
        console.log("User saved:", res.data);

        // Optional: reset form
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          phone: '',
          userId: '',
          password: '',
          languages: [],
          education: '',
          gender: '',
          age: '',
        });
      } catch (err) {
        console.error("Error adding user:", err);
        alert("❌ Failed to add user. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div 
        className={`w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-400 mb-2">
          Create New User Account
        </h1>
        <p className="text-center text-gray-400 mb-8">Please fill in the details to create a new user.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name <span className="text-green-400">*</span></label>
              <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="form-input" placeholder="e.g., John" />
            </div>

            {/* Middle Name */}
            <div>
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-300 mb-1">Middle Name</label>
              <input type="text" name="middleName" id="middleName" value={formData.middleName} onChange={handleChange} className="form-input" placeholder="(Optional)" />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name <span className="text-green-400">*</span></label>
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="form-input" placeholder="e.g., Doe" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address <span className="text-green-400">*</span></label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="user@example.com" />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number <span className="text-green-400">*</span></label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400 text-sm">
                  +91
                </span>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required maxLength="10" pattern="[0-9]{10}" className="form-input rounded-l-none" placeholder="9876543210" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User ID */}
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-300 mb-1">User ID <span className="text-green-400">*</span></label>
              <input type="text" name="userId" id="userId" value={formData.userId} onChange={handleChange} required className="form-input" placeholder="e.g., john.doe_123" />
            </div>
            
             {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password <span className="text-green-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input pr-10"
                    placeholder="Enter user password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
          </div>

           {/* Languages */}
<div className="relative">
  <label className="block text-sm font-medium text-gray-300 mb-1">
    Languages Known
  </label>

  <div className="flex items-center bg-gray-900/50 border border-gray-600 rounded-md p-2.5">
    <button
      type="button"
      onClick={() => setShowLanguageList(!showLanguageList)}
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
    >
      <Globe className="w-5 h-5" />
      <span>Select Languages</span>
    </button>
  </div>

  {/* Dropdown List */}
  {showLanguageList && (
    <div
      className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-gray-800 border border-gray-700 rounded-md shadow-lg p-3"
    >
      {[
        'Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujarati', 'Hindi', 'Kannada',
        'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Manipuri', 'Marathi',
        'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil',
        'Telugu', 'Urdu', 'English', 'Other'
      ].map((lang) => (
        <label
          key={lang}
          className="flex items-center space-x-2 py-1 cursor-pointer text-sm text-gray-300 hover:bg-gray-700/50 rounded-md px-2"
        >
          <input
            type="checkbox"
            checked={formData.languages.includes(lang)}
            onChange={(e) => {
              if (e.target.checked) {
                setFormData(prev => ({
                  ...prev,
                  languages: [...prev.languages, lang],
                }));
              } else {
                setFormData(prev => ({
                  ...prev,
                  languages: prev.languages.filter(l => l !== lang),
                }));
              }
            }}
            className="text-green-400 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
          />
          <span>{lang}</span>
        </label>
      ))}
    </div>
  )}

  {/* Selected Chips */}
  {formData.languages.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-3">
      {formData.languages.map((lang) => (
        <span
          key={lang}
          className="flex items-center bg-green-600/50 text-green-200 rounded-full px-3 py-1 text-sm"
        >
          {lang}
          <button
            type="button"
            onClick={() =>
              setFormData(prev => ({
                ...prev,
                languages: prev.languages.filter(l => l !== lang),
              }))
            }
            className="ml-2 text-green-200 hover:text-white"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  )}
</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Education Info */}
            <div className="md:col-span-1">
                <label htmlFor="education" className="block text-sm font-medium text-gray-300 mb-1">Highest Education</label>
                <input type="text" name="education" id="education" value={formData.education} onChange={handleChange} className="form-input" placeholder="e.g., B.Tech in CSE" />
            </div>
            {/* Gender */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
              <div className="flex items-center space-x-4 mt-2">
                {['Male', 'Female', 'Other'].map(gender => (
                  <label key={gender} className="flex items-center text-sm cursor-pointer">
                    <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} className="h-4 w-4 bg-gray-700 border-gray-600 text-green-500 focus:ring-green-600" />
                    <span className="ml-2 text-gray-300">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Age */}
            <div className="md:col-span-1">
              <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">Age</label>
              <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="form-input" placeholder="e.g., 25" min="1" />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-md font-bold text-white bg-gradient-to-r from-green-700 to-green-400 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Add User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;