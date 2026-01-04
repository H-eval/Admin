// src/components/Badge.jsx
export const Badge = ({ children, variant = 'default' }) => {
  const colors = {
    default: 'bg-gray-700 text-gray-200',
    green: 'bg-green-500/10 text-green-400 border border-green-500/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
    red: 'bg-red-500/10 text-red-400 border border-red-500/30',
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[variant]}`}>
      {children}
    </span>
  );
};
