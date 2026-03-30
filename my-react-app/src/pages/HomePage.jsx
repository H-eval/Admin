import { useEffect, useRef, useState } from "react";
import {
  Info,
  //LayoutDashboard,
  Users
} from "lucide-react";
import Chart from "chart.js/auto";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";


const getMonthlyGrowth = (users = [], admins = []) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return months.map((month, index) => {
    const usersCount = users.filter((u) => {
      if (!u.registrationDate) return false;
      return new Date(u.registrationDate).getMonth() === index;
    }).length;

    const adminCount = admins.filter((a) => {
      if (!a.registrationDate) return false;
      return new Date(a.registrationDate).getMonth() === index;
    }).length;

    return {
      label: month,
      users: usersCount,
      subadmins: adminCount,
    };
  });
};

const getLast7DaysGrowth = (users = [], admins = []) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const dayName = days[d.getDay()];

    const usersCount = users.filter((u) => {
      if (!u.registrationDate) return false;
      return new Date(u.registrationDate).toDateString() === d.toDateString();
    }).length;

    const adminCount = admins.filter((a) => {
      if (!a.registrationDate) return false;
      return new Date(a.registrationDate).toDateString() === d.toDateString();
    }).length;

    last7Days.push({
      day: dayName,
      users: usersCount,
      subadmins: adminCount,
    });
  }

  return last7Days;
};

export default function Homepage() {
  const dropdownRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
   const [viewType, setViewType] = useState("weekly");
  const revenueChartRef = useRef(null);
  const trafficChartRef = useRef(null);

  const revenueCanvasRef = useRef(null);
  const trafficCanvasRef = useRef(null);

  const [data, setData] = useState({
    users: [],
    admins: [],
  });

   const growthData =
  viewType === "weekly"
    ? getLast7DaysGrowth(data.users, data.admins)
    : getMonthlyGrowth(data.users, data.admins);

  const labels = growthData.map((item) => item.day || item.label);
  const usersData = growthData.map((item) => item.users);
  const adminData = growthData.map((item) => item.subadmins);

//   useEffect(() => {
//     setData({
//     users: [
//       { registrationDate: new Date() },
//       { registrationDate: new Date() },
//     ],
//     admins: [
//       { registrationDate: new Date() },
//     ],
//   });
// }, []);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const usersRes = await fetch("/api/users");
//       const adminsRes = await fetch("/api/admins");

//       const usersData = await usersRes.json();
//       const adminsData = await adminsRes.json();

//       setData({
//         users: usersData,
//         admins: adminsData,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchData();
// }, []);

useEffect(() => {
  const words = [
    "Welcome", "Translation", "Language", "Communication", "Learn",
    "स्वागत", "अनुवाद", "भाषा", "संचार", "सीखना",
    "স্বাগতম", "অনুবাদ", "ভাষা", "শিক্ষা", "যোগাযোগ"
  ];

  const elements = [];

  for (let i = 0; i < 40; i++) {
    const word = document.createElement("div");
    word.className = "floating-word";
    word.innerText = words[Math.floor(Math.random() * words.length)];

    word.style.top = Math.random() * 100 + "vh";
    word.style.left = Math.random() * 100 + "vw";
    word.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
    word.style.animationDuration = (5 + Math.random() * 5) + "s";

    document.body.appendChild(word);
    elements.push(word);
  }

  return () => {
    elements.forEach(el => el.remove());
  };
}, []);
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const url =
      activeTab === "users"
        ? `/users/delete-user/${id}`
        : `/admin/delete-admin/${id}`;

    await api.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Deleted successfully ✅");

    // 🔥 refresh data
    const res = await api.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData({
      users: res.data.users || [],
      admins: res.data.admins || [],
    });

  } catch (err) {
    console.error(err);
    alert("Delete failed ❌");
  }
};

useEffect(() => {
  const canvas = trafficCanvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // destroy old chart
  if (trafficChartRef.current) {
    trafficChartRef.current.destroy();
  }

  trafficChartRef.current = new Chart(ctx, {
    type: "doughnut", // 🔥 pie style (better look)
    data: {
      labels: ["Users", "Subadmins"],
      datasets: [
        {
          data: [
            data.users.length,
            data.admins.length,
          ],
          backgroundColor: [
            "#60A5FA", // users
            "#C084FC", // subadmins
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#ccc",
          },
        },
      },
    },
  });

}, [data]);  // 🔥 data change → pie update

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowInfo(false);
      setActiveSection(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData({
        users: res.data.users || [],
        admins: res.data.admins || [],
      });

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  fetchData();
}, []);


useEffect(() => {
  const revenueCanvas = revenueCanvasRef.current;
  if (!revenueCanvas) return;

  const ctx = revenueCanvas.getContext("2d");

  // destroy old chart
  if (revenueChartRef.current) {
    revenueChartRef.current.destroy();
  }

  revenueChartRef.current = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Users",
          data: usersData,
          borderColor: "#60A5FA",
          backgroundColor: "rgba(96,165,250,0.2)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Subadmins",
          data: adminData,
          borderColor: "#C084FC",
          backgroundColor: "rgba(192,132,252,0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });

}, [data, viewType, labels, usersData, adminData]);  // 🔥 ye bahar nahi, yahi likhna hai

  



  return (
    <div className="min-h-screen gradient-bg text-white font-sans relative">

       
        <div className="relative z-10">
      {/* HEADER */}

      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 
bg-white/5 backdrop-blur-md border-b border-white/10 
sticky top-0 z-50">

          <div className="flex items-center gap-4">
            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <LayoutDashboard size={18} />
            </div> */}

            <div>
              <h1 className="text-xl font-semibold">TATVA</h1>
              <p className="text-sm text-gray-400">
            
              </p>
            </div>
          </div>

      

      

        <div className="relative" ref={dropdownRef}>

  <button
    onClick={() => setShowInfo(!showInfo)}
    className="p-2 rounded-lg glass"
  >
  <Info size={18} className="relative top-[2px]" />
  </button>

  {showInfo && (
  <div className="absolute right-0 mt-3 w-96 max-h-[400px] overflow-y-auto 
  bg-white/45 backdrop-blur-xl border border-white/20 
  rounded-xl p-4 text-sm text-white z-50 shadow-lg">

    <div className="space-y-3">

      {/* WHAT IS */}
      <div>
        <button
          onClick={() => setActiveSection(activeSection === 1 ? null : 1)}
          className="w-full text-left font-semibold text-black hover:text-blue-300"
        >
          What is H-Eval?
        </button>

        {activeSection === 1 && (
          <p className="text-black mt-2">
            H-Eval (Human Evaluation for Machine Translation) is a web-based platform designed to assess the quality of machine-translated text through human judgment. It enables evaluators to review translations generated by different machine translation systems and provide structured feedback based on linguistic quality. The platform ensures accurate and reliable evaluation by combining human insights with systematic scoring.
          </p>
        )}
      </div>

      {/* HOW IT WORKS */}
      <div>
        <button
          onClick={() => setActiveSection(activeSection === 2 ? null : 2)}
          className="w-full text-left font-semibold text-black hover:text-blue-300"
        >
          📌 How It Works
        </button>

        {activeSection === 2 && (
          <ul className="text-black mt-2 list-disc pl-5 space-y-1">
            <li>Translated sentences are uploaded into the platform</li>
            <li>Evaluators analyze based on 11 linguistic parameters</li>
            <li>Each translation is scored from 1 to 4</li>
            <li>Optional comments can be added</li>
          </ul>
        )}
      </div>

      {/* FEATURES */}
      <div>
        <button
          onClick={() => setActiveSection(activeSection === 3 ? null : 3)}
          className="w-full text-left font-semibold text-black hover:text-blue-300"
        >
          📌 Key Features
        </button>

        {activeSection === 3 && (
          <ul className="text-black mt-2 list-disc pl-5 space-y-1">
            <li> Correlation analysis with automatic metrics</li>
            <li> Real-time interactive dashboard</li>
            <li> Evaluation history tracking</li>
            <li> Role-based access control</li>
          </ul>
        )}
      </div>

      {/* ROLES */}
      <div>
        <button
          onClick={() => setActiveSection(activeSection === 4 ? null : 4)}
          className="w-full text-left font-semibold text-black hover:text-blue-300"
        >
          📌 System Roles
        </button>

        {activeSection === 4 && (
          <ul className="text-black mt-2 space-y-1">
            <li><strong>Admin:</strong> Full system control</li>
            <li><strong>Sub-admin:</strong> Assists management</li>
            <li><strong>User:</strong> Evaluates translations</li>
          </ul>
        )}
      </div>

      {/* PURPOSE */}
      <div>
        <button
          onClick={() => setActiveSection(activeSection === 5 ? null : 5)}
          className="w-full text-left font-semibold text-black hover:text-blue-300"
        >
          📌 Purpose
        </button>

        {activeSection === 5 && (
          <p className="text-black mt-2">
            H-Eval bridges the gap between automated evaluation and human judgment in machine translation systems. It provides a reliable platform for analyzing translation quality, improving system performance, and supporting research in NLP. The system is designed for large-scale evaluations with accuracy and consistency.
          </p>
        )}
      </div>

    </div>
  </div>
)}

            <button
  onClick={() => {
    localStorage.removeItem("token");   // 🔥 token remove
    window.location.href = "/otp";      // 🔥 redirect
  }}
  className="px-3 py-1.5 rounded-lg border border-red-400/30 
  text-red-300 text-xs 
  bg-red-500/10 
  hover:bg-red-500/20 hover:text-white 
  transition-all duration-300"
>
  Logout
</button>

          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* STATS */}
      
        
        {/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-between">

  {/* LEFT SIDE (ICON + TEXT) */}
  <div className="flex items-center gap-4">
    <div className="p-3 rounded-xl bg-white/10">
      {/* 👇 tumhara icon */}
      <Users className="w-6 h-6 text-white" />
    </div>

    <div>
      <p className="text-sm text-gray-400">Total Users</p>
      <p className="text-2xl font-bold">3</p>
    </div>
  </div>

  {/* RIGHT SIDE (BUTTON) */}
  <button
    onClick={() => navigate("/addUser")}
    className="px-4 py-2 rounded-lg border border-blue-400/30 
    text-blue-300 text-sm bg-blue-500/10 
    hover:bg-blue-500/20 hover:text-white transition-all duration-300"
  >
    + Add User
  </button>

</div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-between">

  <div className="flex items-center gap-4">
    <div className="p-3 rounded-xl bg-white/10">
      <Users className="w-6 h-6 text-white" />
    </div>

    <div>
      <p className="text-sm text-gray-400">Total Subadmins</p>
      <p className="text-2xl font-bold">{data.admins.length}</p>
    </div>
  </div>

  <button
    onClick={() => navigate("/addAdmin")}
    className="px-4 py-2 rounded-lg border border-purple-400/30 
    text-purple-300 text-sm bg-purple-500/10 
    hover:bg-purple-500/20 hover:text-white transition-all duration-300"
  >
    + Add Admin
  </button>

</div>
        

        </section>


        {/* CHARTS */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
          {/* <div className="lg:col-span-2 glass rounded-2xl p-6"> */}
<div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h1 className="text-lg font-semibold mb-4">
              Users and Subadmin Growth
            </h1>

            <div className="flex gap-2 mb-4">
    <button
      onClick={() => setViewType("weekly")}
      className={`px-3 py-1 rounded ${
        viewType === "weekly" ? "bg-blue-500" : "bg-white/10"
      }`}
    >
      Last 7 Days
    </button>

    <button
      onClick={() => setViewType("yearly")}
      className={`px-3 py-1 rounded ${
        viewType === "yearly" ? "bg-purple-500" : "bg-white/10"
      }`}
    >
      Yearly
    </button>
  </div>

            <div className="h-72">
              <canvas ref={revenueCanvasRef} className="w-full h-full"></canvas>
            </div>
            </div>
          </div>
{/* 
          <div className="glass rounded-2xl p-6"> */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h1 className="text-lg font-semibold mb-4">
              System Status
            </h1>

            <div className="h-48">
              <canvas ref={trafficCanvasRef}></canvas>
            </div>

          </div>
          

        </section>


        {/* TABLE */}

        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
  <h2 className="text-lg font-semibold">Users & Subadmins</h2>

  <div className="flex gap-2">
    <button
      onClick={() => setActiveTab("users")}
      className={`px-3 py-1 rounded ${
        activeTab === "users" ? "bg-blue-500" : "bg-white/10"
      }`}
    >
      Users
    </button>

    <button
      onClick={() => setActiveTab("admins")}
      className={`px-3 py-1 rounded ${
        activeTab === "admins" ? "bg-purple-500" : "bg-white/10"
      }`}
    >
      Subadmins
    </button>
  </div>
</div>

  <table className="w-full text-sm text-white">
  <thead>
    <tr className="border-b border-white/10 hover:bg-white/5 transition">
      <th className="text-left py-4 px-6">Name</th>
      <th className="text-left py-4 px-6">Email</th>
      <th className="text-left py-4 px-6">Language</th>
      <th className="text-left py-4 px-6">Joined</th>
      <th className="text-left py-4 px-6">Action</th>
    </tr>
  </thead>

  <tbody>
    {(activeTab === "users" ? data.users : data.admins)?.length > 0 ? (
      (activeTab === "users" ? data.users : data.admins).map(
        (person, index) => (
          <tr key={index} className="border-b border-white/5">
            <td className="py-4 px-6">{person.name || "—"}</td>
            <td className="py-4 px-6 text-gray-400">
              {person.email || "—"}
            </td>
            <td className="py-4 px-6 text-gray-400">
              {person.language || "—"}
            </td>
            <td className="py-4 px-6 text-gray-400">
              {person.registrationDate
                ? new Date(person.registrationDate).toLocaleDateString()
                : "—"}
            </td>
            <td className="py-4 px-6">
  <button
    onClick={() => handleDelete(person._id)}
    className="px-3 py-1 rounded bg-red-500/10 text-red-300 
    hover:bg-red-500/20 text-xs transition"
  >
    Delete
  </button>
</td>
          </tr>
        )
      )
    ) : (
      <tr>
        <td colSpan="5" className="text-center py-6 text-gray-400">
          No data found
        </td>
      </tr>
    )}
  </tbody>
</table>
          

            </section>
      </main>
      
    </div>
    </div>
  );
}



