// src/components/Sidebar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Home, LayoutDashboard, UserPlus, Users, Info, LogOut } from 'lucide-react';
import { NavItem } from './Navitem';

const navItems = [
  { name: 'Home', icon: Home, page: 'Home' },
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
  { name: 'Add User', icon: UserPlus, page: 'Add User' },
  { name: 'Add Subadmin', icon: Users, page: 'Add Subadmin' },
  { name: 'About', icon: Info, page: 'About' },
  { name: 'Logout', icon: LogOut, page: 'Logout' },
];

export const Sidebar = ({ currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen }) => (
  <>
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </AnimatePresence>

    <motion.div
      className={`fixed lg:sticky top-0 h-screen bg-gray-950 border-r border-gray-800 z-50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      animate={{ width: 250 }}
    >
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-8 h-8 text-green-400" />
          <span className="text-xl font-bold text-white">Admin</span>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white lg:hidden">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ))}
      </nav>
    </motion.div>
  </>
);
