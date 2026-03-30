
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// import {DashboardPage} from "./pages/DashboardPage";
// import { PlaceholderPage } from "./pages/PlaceholderPage";
// import { Menu, ShoppingBag } from "lucide-react";
// import Otp from "./pages/otp";
// import  AddUserPage from "./pages/addUser";
// import SubAdminPage  from "./pages/addAdmin";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";


// // ✅ Wrapper for Router so useNavigate works
// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

// const App = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       navigate("/dashboard");
//     } else {
//       navigate("/otp");
//     }
//   }, [token, navigate]);

//   return (
//     <Routes>
//       {/* OTP Route */}
//       <Route
//         path="/otp"
//         element={token ? <Navigate to="/HomePage" /> : <Otp />}
//       />

//       {/* Protected Dashboard */}
//       {token ? (
//         <Route path="/dashboard" element={<AdminLayout />} />
//       ) : (
//         <Route path="*" element={<Navigate to="/otp" replace />} />
//       )}

//       {/* Default Redirect */}
//       <Route path="/" element={<Navigate to="/otp" replace />} />
//     </Routes>
//   );
// };

// // ✅ Your original dashboard UI (no change)
// const AdminLayout = () => {
//    return <HomePage />;
// };
// //   const [currentPage, setCurrentPage] = useState("Home");

// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const renderPage = () => {
// //     switch (currentPage) {
// //       case "Home":
// //         return <HomePage setCurrentPage={setCurrentPage} />;
// //       case "Dashboard":
// //         return <DashboardPage />;
// //       case "Add User":
// //         return  <AddUserPage />;
// //       case "Add Subadmin":
// //         return  <SubAdminPage />;
// //       case "About":
// //   return <AboutPage />;

// //       case "Logout":
// //         localStorage.removeItem("token");
// //         window.location.href = "/otp";
// //         return null;
// //       default:
// //         return <DashboardPage />;
// //     }
// //   };

// //   return (
// //  <div className="flex h-screen w-screen bg-gray-950 text-gray-200 font-inter dark">
// //       {/* Sidebar */}

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         {/* Mobile Header */}
// //         <header className="lg:hidden h-20 flex items-center justify-between px-6 bg-gray-950 border-b border-gray-800">
// //           <div className="flex items-center space-x-2">
// //             <ShoppingBag className="w-7 h-7 text-green-400" />
// //             <span className="text-lg font-bold text-white">Admin</span>
// //           </div>
// //           <button
// //             onClick={() => setIsSidebarOpen(true)}
// //             className="text-gray-400 hover:text-white"
// //           >
// //             <Menu className="w-6 h-6" />
// //           </button>
// //         </header>

// //         {/* Content Area */}
// //         <main className="flex-1 overflow-y-auto bg-gray-950">
// //           <AnimatePresence mode="wait">
// //             <motion.div
// //               key={currentPage}
// //               initial={{ opacity: 0, scale: 0.98 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               exit={{ opacity: 0, scale: 0.98 }}
// //               transition={{ duration: 0.2 }}
// //             >
// //               {renderPage()}
// //             </motion.div>
// //           </AnimatePresence>
// //         </main>
// //       </div>
// //     </div>
// //   );


// export default AppWrapper;

// import React, { useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";

// import Otp from "./pages/otp";
// import HomePage from "./pages/HomePage";
// import AddUserPage from "./pages/addUser";
// import SubAdminPage from "./pages/addAdmin";


// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

// const App = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   if (token) {
//   //     navigate("/home");   // 🔥 direct HomePage
//   //   } else {
//   //     navigate("/otp");
//   //   }
//   // }, [token, navigate]);

//   return (
//     <Routes>
//       <Route
//         path="/otp"
//         element={token ? <Navigate to="/home" /> : <Otp />}
//       />

//       <Route
//         path="/home"
//         element={token ? <HomePage /> : <Navigate to="/otp" />}
//       />

      
    
//     <Route path="/addUser" element={<AddUserPage />} />
// <Route path="/addAdmin" element={<SubAdminPage />} />
// <Route path="*" element={<Navigate to="/otp" />} />
// </Routes>
//   );
// };

//export default AppWrapper;



import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Otp from "./pages/otp";
import HomePage from "./pages/HomePage";
import AddUserPage from "./pages/addUser";
import SubAdminPage from "./pages/addAdmin";

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/otp"
        element={token ? <Navigate to="/home" /> : <Otp />}
      />

      <Route
        path="/home"
        element={token ? <HomePage /> : <Navigate to="/otp" />}
      />

      {/* 🔥 Just protect these (only change) */}
      <Route
        path="/addUser"
        element={token ? <AddUserPage /> : <Navigate to="/otp" />}
      />

      <Route
        path="/addAdmin"
        element={token ? <SubAdminPage /> : <Navigate to="/otp" />}
      />

      {/* default routes */}
      <Route path="/" element={<Navigate to="/otp" />} />
      <Route path="*" element={<Navigate to="/otp" />} />
    </Routes>
  );
};

export default AppWrapper;