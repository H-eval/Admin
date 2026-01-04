// src/components/Card.jsx
import { motion } from 'framer-motion';

export const Card = ({ children, className = '' }) => (
  <motion.div
    className={`bg-gray-900 border border-gray-800 rounded-xl shadow-lg ${className}`}
    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {children}
  </motion.div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
