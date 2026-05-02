import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";

const FoodPartnerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()

  const isfoodPartner = location.pathname === "/foodPartner/register"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/foodPartner/register",{
      name,
      email,
      password,
      contactName,
      phone,
      address
    },{
      withCredentials : true
    })

     const foodPartnerId = response.data.foodPartner?._id;

     if (foodPartnerId) {
      navigate(`/foodPartner/${foodPartnerId}`);
     } else {
      navigate("/createFood");
     }
      console.log("food partner registered");
    } catch (error) {
      console.error(
        "User registration failed:",
        error.response?.data || error.message
      );
    }
    
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 font-sans">
       
      <div className="w-full max-w-lg bg-neutral-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">

<div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
  <button
    onClick={() => navigate("/foodPartner/register")}
    className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
      isfoodPartner
        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
        : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
    }`}
  >
     Food Partner
  </button>
  <button
    onClick={() => navigate("/user/register")}
    className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
      !isfoodPartner
        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
        : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
    }`}
  >
    User
  </button>
</div>
  
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Become a food partner
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Join our network and start reaching more customers today.
        </p>

        {/* Badge */}
        <span className="inline-block text-xs font-medium bg-red-100 dark:bg-orange-950 text-red-400 dark:text-red-00 rounded px-2.5 py-1 mb-6">
          Partner application
        </span>

        {/* Form Fields */}
        <form className="authForm" onSubmit={handleSubmit}>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Business Name */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Business name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Pizza Palace"
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition"
            />
          </div>

          {/* Contact Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Contact person <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              placeholder="Full name"
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Your contact number"
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Email address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@business.com"
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Address <span className="text-red-400">*</span>
            </label>
            <textarea
              name="address"
              rows={3}
              placeholder="Street, city, state, PIN code"
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition resize-none"
            />
          </div>

          {/* Password */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Min. 8 characters"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-5 py-2.5 rounded-lg bg-red-400 hover:bg-red-600 active:scale-[0.98] text-white text-sm font-medium transition"
        >
          Create partner account
        </button>
        </form>
 

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/foodpartner/login" className="text-red-500 dark:text-red-400 font-medium hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
};

export default FoodPartnerRegister;
