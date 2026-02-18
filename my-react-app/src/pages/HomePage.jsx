import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import { motion } from "framer-motion";

const HomePage = ({ setCurrentPage }) => {
const [stats, setStats] = useState({
  totalUsers: 0,
  totalSubadmins: 0,
});
useEffect(() => {
  const fetchHomeStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/home-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Home stats:", res.data);

      setStats({
        totalUsers: res.data.totalUsers,
        totalSubadmins: res.data.totalSubadmins,
      });
    } catch (error) {
      console.error("Failed to fetch home stats:", error);
    }
  };

  fetchHomeStats();
}, []);

  return (
    <div className="p-8 text-green space-y-10">
      
      {/* 🔹 Hero Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black
             rounded-3xl p-10
             shadow-[0_0_45px_rgba(34,197,94,0.18)]
             border border-green-500/30"
>
  <h1 className="text-4xl md:text-5xl font-bold text-green-400">
    Welcome, Admin
  </h1>

  <p className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
    This is your central control center to manage users, subadmins,
    evaluations, and system security — all from one place.
  </p>

  <div className="mt-6 flex flex-wrap gap-3">
    <span className="px-4 py-1 rounded-full text-sm bg-green-500/10 text-green-400 border border-green-500/30">
      Secure
    </span>
    <span className="px-4 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/30">
      Real-time Control
    </span>
    <span className="px-4 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400 border border-purple-500/30">
      Role-Based Access
    </span>
  </div>
</motion.div>


      {/* 🔹 Stats Section */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
   className="bg-gray-900/80 rounded-xl p-6
           shadow-md hover:shadow-[0_0_18px_rgba(34,197,94,0.15)]
           transition-all"

  >
    <h3 className="text-gray-400 text-sm">Total Users</h3>
    <p className="text-3xl font-bold mt-2">128</p>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-gray-900/80 rounded-xl p-6
           shadow-md hover:shadow-[0_0_18px_rgba(34,197,94,0.15)]
           transition-all"

  >
    <h3 className="text-gray-400 text-sm">Subadmins</h3>
    <p className="text-3xl font-bold mt-2">6</p>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
   className="bg-gray-900/80 rounded-xl p-6
           shadow-md hover:shadow-[0_0_18px_rgba(34,197,94,0.15)]
           transition-all"

  >
    <h3 className="text-gray-400 text-sm">Evaluations</h3>
    <p className="text-3xl font-bold mt-2">342</p>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
   className="bg-gray-900/80 rounded-xl p-6
           shadow-md hover:shadow-[0_0_18px_rgba(34,197,94,0.15)]
           transition-all"

  >
    <h3 className="text-gray-400 text-sm">System Status</h3>
    <p className="text-white-800 text-lg font-semibold mt-2">
      Secure & Active
    </p>
  </motion.div>

</div>
{/* 🔹 Quick Actions Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black
             rounded-3xl p-10
             shadow-[0_0_45px_rgba(34,197,94,0.18)]
             border border-green-500/30"
>
  <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    <div
  onClick={() => setCurrentPage("Add User")}
  className="group cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900
             rounded-2xl p-6 border border-gray-700
             hover:border-green-500/50
             shadow-md hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]
             transition-all duration-300"
>
  <div className="flex items-start gap-4">
    <div className="text-2xl text-green-400 group-hover:scale-110 transition">
      ➕
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-1">
        Add User
      </h3>
      <p className="text-gray-400 text-sm">
        Create new evaluators and assign them to the system.
      </p>
    </div>
  </div>
</div>


 <div
  onClick={() => setCurrentPage("Add Subadmin")}
  className="group cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900
             rounded-2xl p-6 border border-gray-700
             hover:border-blue-500/50
             shadow-md hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
             transition-all duration-300"
>
  <div className="flex items-start gap-4">
    <div className="text-3xl text-blue-400 group-hover:scale-110 transition">
      👤
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-1">
        Add Subadmin
      </h3>
      <p className="text-gray-400 text-sm">
        Grant administrative access to trusted users.
      </p>
    </div>
  </div>
</div>


    <div
  onClick={() => setCurrentPage("Dashboard")}
  className="group cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900
             rounded-2xl p-6 border border-gray-700
             hover:border-purple-500/50
             shadow-md hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
             transition-all duration-300"
>
  <div className="flex items-start gap-4">
    <div className="text-3xl text-purple-400 group-hover:scale-110 transition">
      📊
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-1">
        Dashboard
      </h3>
      <p className="text-gray-400 text-sm">
        View analytics, users, subadmins, and system insights.
      </p>
    </div>
  </div>
</div>


  </div>
</motion.div>

{/* 🔹 System Info Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="bg-gray-900 border border-gray-700 rounded-2xl p-8"
>
  <h2 className="text-2xl font-bold mb-6 text-green-400">
    System Status
  </h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="flex items-center gap-3 bg-gray-800/60 p-4 rounded-xl">
    <span className="text-green-400 text-xl">🔐</span>
    <span className="text-gray-300 text-sm">
      JWT-based Authentication Enabled
    </span>
  </div>

  <div className="flex items-center gap-3 bg-gray-800/60 p-4 rounded-xl">
    <span className="text-blue-400 text-xl">🛂</span>
    <span className="text-gray-300 text-sm">
      Role-Based Access Control
    </span>
  </div>

  <div className="flex items-center gap-3 bg-gray-800/60 p-4 rounded-xl">
    <span className="text-purple-400 text-xl">🔑</span>
    <span className="text-gray-300 text-sm">
      Passwords Secured with bcrypt
    </span>
  </div>

  <div className="flex items-center gap-3 bg-gray-800/60 p-4 rounded-xl">
    <span className="text-yellow-400 text-xl">🛡️</span>
    <span className="text-gray-300 text-sm">
      Protected Admin Routes
    </span>
  </div>
</div>

</motion.div>

{/* 🔹 Footer Section */}
<motion.footer
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mt-20 border-t border-gray-800 pt-10 pb-6"
>
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Left */}
    <div>
      <h3 className="text-xl font-bold text-green-400 mb-3">
        Admin Control Panel
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        A secure and scalable admin dashboard to manage users, subadmins,
        evaluations, and system operations efficiently.
      </p>
    </div>

    {/* Center */}
    <div>
      <h4 className="text-sm font-semibold text-gray-300 mb-4">
        Tech Stack
      </h4>

      <div className="flex flex-wrap gap-2">
        {[
          "React",
          "Tailwind CSS",
          "Framer Motion",
          "Node.js",
          "Express",
          "MongoDB",
          "JWT Auth",
        ].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-xs
                       bg-green-500/10 text-green-400
                       border border-green-500/30"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Right */}
    <div>
      <h4 className="text-sm font-semibold text-gray-300 mb-4">
        Quick Links
      </h4>

      <ul className="space-y-2 text-sm">
        <li
          onClick={() => setCurrentPage("Dashboard")}
          className="cursor-pointer text-gray-400 hover:text-green-400 transition"
        >
          Dashboard
        </li>
        <li
          onClick={() => setCurrentPage("Add User")}
          className="cursor-pointer text-gray-400 hover:text-green-400 transition"
        >
          Add User
        </li>
        <li
          onClick={() => setCurrentPage("Add Subadmin")}
          className="cursor-pointer text-gray-400 hover:text-green-400 transition"
        >
          Add Subadmin
        </li>
        <li
          onClick={() => setCurrentPage("About")}
          className="cursor-pointer text-gray-400 hover:text-green-400 transition"
        >
          About
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom */}
  <div className="mt-10 text-center text-xs text-gray-500">
    © {new Date().getFullYear()} Admin Dashboard • Built with 💚 using MERN Stack
  </div>
</motion.footer>

    </div>
  );
};

export default HomePage;
