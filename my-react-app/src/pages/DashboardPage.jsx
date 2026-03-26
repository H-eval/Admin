import React, { useState, useEffect, useCallback } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";  

// --- Mock Data (fallbacks) ---

const defaultStatsCardsData = [
  {
    title: "Sales Overview",
    value: "$15,000",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    shadow: "shadow-[0_0_15px_rgba(52,211,153,0.3)]",
  },
  {
    title: "Available Products",
    value: "400K",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    shadow: "shadow-[0_0_15px_rgba(192,132,252,0.3)]",
  },
  // {
  //   title: "Clientele",
  //   value: "120",
  //   color: "text-blue-400",
  //   bgColor: "bg-blue-500/10",
  //   shadow: "shadow-[0_0_15px_rgba(96,165,250,0.3)]",
  // },
  // {
  //   title: "Total Revenue",
  //   value: "$11,500",
  //   color: "text-yellow-400",
  //   bgColor: "bg-yellow-500/10",
  //   shadow: "shadow-[0_0_15px_rgba(250,204,21,0.3)]",
  // },
];

const PIE_COLORS = ["#34D399", "#C084FC", "#60A5FA"];

// --- UI Components ---
const Card = ({ children, className = "" }) => (
  <motion.div
    className={`bg-gray-900 border border-gray-800 rounded-xl shadow-lg ${className}`}
    whileHover={{ y: -3 }}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default", onClick, className = "" }) => {
  const colors = {
    green: "bg-green-500/10 text-green-400 border border-green-500/30",
    yellow: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    red: "bg-red-500/10 text-red-400 border border-red-500/30",
    default: "bg-gray-700 text-gray-200",
  };
 

  return (
    <span
  onClick={onClick}
  className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[variant]} ${className}`}
>
  {children}
</span>

  );
};

// --- Dashboard Logic + UI ---
export const DashboardPage = () => {
  const [data, setData] = useState({
    totalAdmins: 0,
    totalUsers: 0,
    admins: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this permanently?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    // Decide API based on active tab
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

    // 🔄 Refresh dashboard data
    fetchDashboardData();
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete. Please try again.");
  }
};



  // ✅ Fetch dashboard data with token
  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/otp");
        return;
      }

      const res = await api.get("/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);

      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/otp");
      } else {
        alert("Failed to fetch dashboard data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const getLast7DaysGrowth = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const dayName = days[d.getDay()];

    const usersCount = data.users.filter((u) => {
      if (!u.registrationDate) return false;
      const date = new Date(u.registrationDate);
      return date.toDateString() === d.toDateString();
    }).length;

    const adminCount = data.admins.filter((a) => {
      if (!a.registrationDate) return false;
      const date = new Date(a.registrationDate);
      return date.toDateString() === d.toDateString();
    }).length;

    last7Days.push({
      day: dayName,
      users: usersCount,
      subadmins: adminCount,
    });
  }

  return last7Days;
};
const growthData = getLast7DaysGrowth();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading dashboard...</p>
    );

  // Optional: use real data if provided
  const statsCardsData = [
    {
      title: "Total Admins",
      value: data.totalAdmins ?? 0,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      shadow: "shadow-[0_0_15px_rgba(52,211,153,0.3)]",
    },
    {
      title: "Total Users",
      value: data.totalUsers ?? 0,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      shadow: "shadow-[0_0_15px_rgba(96,165,250,0.3)]",
    },
    ...defaultStatsCardsData.slice(2), // Keep remaining cards as before
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 space-y-6"
    >
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCardsData.map((stat) => (
          <Card key={stat.title} className={stat.shadow}>
            <CardHeader>
              <CardTitle className="text-sm text-gray-400">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day User/Subadmin Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User & Subadmin Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="day" stroke="#a0a0a0" />
                  <YAxis stroke="#a0a0a0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#404040",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Users"
                      />
                      <Line
                        type="monotone"
                        dataKey="subadmins"
                        stroke="#C084FC"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Subadmins"
                      />
                </LineChart>
                  
                    
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Product Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Users", value: data.totalUsers || 0 },
                      { name: "Subadmins", value: data.totalAdmins || 0 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                  >
                     {[
                        { name: "Users", value: data.totalUsers || 0 },
                        { name: "Subadmins", value: data.totalAdmins || 0 },
                      ].map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}   
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#404040",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
               {[
                { name: "Users", value: data.totalUsers || 0 },
                { name: "Subadmins", value: data.totalAdmins || 0 },
              ].map((item, index) => (
                <div key={item.name} className="flex items-center space-x-1.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[index] }}
                  />
                  <span className="text-xs text-gray-400">{item.name}  ({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users & Subadmins (Toggle View) */}
<Card>
  <CardHeader className="flex items-center justify-between">
    <CardTitle>Recent Users & Subadmins</CardTitle>

    {/* Toggle Buttons */}
    <div className="flex bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <button
        onClick={() => setActiveTab("users")}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === "users"
            ? "bg-green-600 text-black"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        Users
      </button>
      <button
        onClick={() => setActiveTab("subadmins")}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === "subadmins"
            ? "bg-green-600 text-black"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        Subadmins
      </button>
    </div>
  </CardHeader>

  <CardContent className="!p-0">
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-gray-800">
          <tr className="text-xs text-gray-400 uppercase">
            <th className="p-5 font-medium">Name</th>
            <th className="p-5 font-medium">Email</th>
            <th className="p-5 font-medium">Language</th>
            <th className="p-5 font-medium">Registered</th>
            <th className="p-5 font-medium text-center">Action</th>

          </tr>
        </thead>

        <tbody>
          {(activeTab === "users" ? data.users : data.admins)?.length > 0 ? (
            (activeTab === "users" ? data.users : data.admins).map(
              (person, idx) => (
                <motion.tr
                  key={idx}
                  className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="p-4 text-sm text-white font-medium">
                    {person.name || "—"}
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {person.email || "—"}
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {person.language || "—"}
                  </td>
                  <td className="p-4">
                    <Badge variant={activeTab === "users" ? "green" : "green"}>
                      {person.registrationDate
                        ? new Date(
                            person.registrationDate  
                          ).toLocaleDateString()
                        : "—"}
                    </Badge>
                  </td>
                  
                <td className="p-5">
  <div className="flex justify-center">
    <Badge
      variant="red"
      className="cursor-pointer hover:opacity-80"
      onClick={() => handleDelete(person._id)}
    >
      Delete
    </Badge>
  </div>
</td>


                </motion.tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center text-gray-500 text-sm py-6"
              >
                No {activeTab === "users" ? "users" : "subadmins"} found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>

    </motion.div>
  );
};
