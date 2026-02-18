import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-8"
    >
      {/* Hero Section */}
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black
             border border-green-500/30 rounded-2xl p-10
             shadow-[0_0_40px_rgba(34,197,94,0.15)]"
>
  <h1 className="text-4xl font-bold text-green-400 tracking-tight">
    Admin Control Center
  </h1>

  <p className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
    A centralized administration system designed to manage users, subadmins,
    and platform operations with secure authentication and real-time control.
  </p>

  <div className="mt-6 flex gap-3">
    <span className="px-4 py-1 rounded-full text-sm bg-green-500/10 text-green-400 border border-green-500/30">
      Secure
    </span>
    <span className="px-4 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/30">
      Scalable
    </span>
    <span className="px-4 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400 border border-purple-500/30">
      Role-Based
    </span>
  </div>
</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="mt-14"
>
  <h2 className="text-2xl font-semibold text-white mb-8">
    How the System Works
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        step: "01",
        title: "Secure Admin Login",
        desc: "Admin authenticates using email-based OTP or credentials. JWT token is generated after successful verification.",
      },
      {
        step: "02",
        title: "Role Validation",
        desc: "JWT token is verified on each request to ensure only authorized admins or subadmins can access protected routes.",
      },
      {
        step: "03",
        title: "Dashboard Access",
        desc: "Authenticated users are redirected to the admin dashboard with role-based permissions.",
      },
      {
        step: "04",
        title: "User & Subadmin Management",
        desc: "Admins can add, view, or delete users and subadmins. All actions are synced with MongoDB.",
      },
      {
        step: "05",
        title: "Data Persistence",
        desc: "All user data, roles, and activities are securely stored and managed using MongoDB.",
      },
      {
        step: "06",
        title: "Session Handling",
        desc: "JWT expiration and logout ensure secure session lifecycle management.",
      },
    ].map((item) => (
      <motion.div
        key={item.step}
        whileHover={{ y: -5 }}
        className="bg-gray-900 border border-gray-800 rounded-xl p-6
                   shadow-md hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]
                   transition-all"
      >
        <div className="text-green-400 text-sm font-bold">
          STEP {item.step}
        </div>
        <h3 className="text-lg font-semibold text-white mt-2">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
          {item.desc}
        </p>
      </motion.div>
    ))}
  </div>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="mt-16"
>
  <h2 className="text-2xl font-semibold text-white mb-10">
    System Architecture
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Frontend */}
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
                    transition-all">
      <h3 className="text-lg font-semibold text-blue-400">
        Frontend (React)
      </h3>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        Built using React.js with component-based architecture, Tailwind CSS
        for styling, and Framer Motion for smooth UI animations.
      </p>
    </div>

    {/* Backend */}
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6
                    hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]
                    transition-all">
      <h3 className="text-lg font-semibold text-green-400">
        Backend (Node + Express)
      </h3>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        RESTful APIs built using Express.js. Handles authentication, role
        validation, CRUD operations, and JWT-based security.
      </p>
    </div>

    {/* Database */}
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
                    transition-all">
      <h3 className="text-lg font-semibold text-purple-400">
        Database (MongoDB)
      </h3>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        MongoDB stores user records, admin roles, and system data using
        Mongoose schemas for structured access.
      </p>
    </div>
  </div>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mt-16"
>
  <h2 className="text-2xl font-semibold text-white mb-10">
    Security & Access Control
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* JWT Security */}
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6
                    hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]
                    transition-all">
      <h3 className="text-lg font-semibold text-green-400">
        JWT Authentication
      </h3>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        After successful login, a JSON Web Token (JWT) is generated and stored
        securely. This token is sent with every request to validate the user
        session.
      </p>
    </div>

    {/* Role Based Access */}
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6
                    hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]
                    transition-all">
      <h3 className="text-lg font-semibold text-red-400">
        Role-Based Authorization
      </h3>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        Access to routes and actions is controlled based on roles such as
        Admin and Subadmin, ensuring unauthorized users cannot access
        restricted features.
      </p>
    </div>

    {/* Protected Routes */}
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
                    transition-all">
      <h3 className="text-lg font-semibold text-blue-400">
        Protected Routes
      </h3>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        Frontend routes are protected using token checks. If the token is
        missing or expired, the user is redirected to the login page.
      </p>
    </div>

    {/* Session Handling */}
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
                    transition-all">
      <h3 className="text-lg font-semibold text-purple-400">
        Session Management
      </h3>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        Tokens have expiration time and logout clears stored credentials,
        preventing unauthorized session reuse.
      </p>
    </div>
  </div>
</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="mt-20 border-t border-gray-800 pt-8 text-center"
>
  <p className="text-sm text-gray-500">
    Admin Dashboard v1.0
  </p>

  <p className="text-sm text-gray-400 mt-2">
    Built using <span className="text-green-400 font-medium">MERN Stack</span> —
    React, Node.js, Express & MongoDB
  </p>

  <p className="text-xs text-gray-600 mt-3">
    © 2026 • Secure Admin Management System
  </p>
</motion.div>

    </motion.div>
  );
};

export default AboutPage;
