 import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

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

const SubAdminPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    userId: "",
    password: "",
    phone: "",
    gender: "",
    age: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => setVisible(true), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/admin/add-admin",
        {
          name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          gender: formData.gender,
          age: formData.age,
          userId: formData.userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Subadmin added successfully!");
      console.log("Subadmin created:", res.data);

      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        userId: "",
        password: "",
        phone: "",
        gender: "",
        age: "",
      });
    } catch (err) {
      console.error("Error adding subadmin:", err);
      alert("❌ Failed to add subadmin. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className={`w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-400 mb-2">
          Create New Subadmin
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Please fill in the details to create a new subadmin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                First Name <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., John"
              />
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="form-input"
                placeholder="(Optional)"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Last Name <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address <span className="text-green-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="subadmin@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="9876543210"
                maxLength="10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                User ID <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., admin.john"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password <span className="text-green-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input pr-10"
                  placeholder="Enter password"
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

          {/* Gender & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
              <div className="flex items-center space-x-4 mt-2">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="h-4 w-4 bg-gray-700 border-gray-600 text-green-500 focus:ring-green-600"
                    />
                    <span className="ml-2 text-gray-300">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 30"
                min="1"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-md font-bold text-white bg-gradient-to-r from-green-700 to-green-400 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Add Subadmin"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubAdminPage;
