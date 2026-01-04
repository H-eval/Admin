// src/components/NavItem.jsx
import { motion } from 'framer-motion';

export const NavItem = ({ item, currentPage, setCurrentPage, setIsSidebarOpen }) => {
  const isActive = currentPage === item.page;

  return (
    <motion.button
      onClick={() => {
        setCurrentPage(item.page);
        setIsSidebarOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'text-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span>{item.name}</span>
    </motion.button>
  );
};
