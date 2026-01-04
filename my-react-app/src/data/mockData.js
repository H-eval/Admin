// src/data/mockData.js
import { DollarSign, ShoppingCart, Users2, BarChart2 } from 'lucide-react';

export const statsCardsData = [
  {
    title: 'Sales Overview',
    value: '$15,000',
    icon: DollarSign,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.3)]',
  },
  {
    title: 'Available Products',
    value: '400K',
    icon: ShoppingCart,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    shadow: 'shadow-[0_0_15px_rgba(192,132,252,0.3)]',
  },
  {
    title: 'Clientele',
    value: '120',
    icon: Users2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    shadow: 'shadow-[0_0_15px_rgba(96,165,250,0.3)]',
  },
  {
    title: 'Total Revenue',
    value: '$11,500',
    icon: BarChart2,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    shadow: 'shadow-[0_0_15px_rgba(250,204,21,0.3)]',
  },
];

export const monthlyEarningsData = [
  { name: 'Jan', earnings: 1200 },
  { name: 'Feb', earnings: 2100 },
  { name: 'Mar', earnings: 1800 },
  { name: 'Apr', earnings: 2400 },
  { name: 'May', earnings: 2200 },
  { name: 'Jun', earnings: 3000 },
  { name: 'Jul', earnings: 2800 },
  { name: 'Aug', earnings: 3500 },
  { name: 'Sep', earnings: 3200 },
  { name: 'Oct', earnings: 4000 },
  { name: 'Nov', earnings: 3800 },
  { name: 'Dec', earnings: 4500 },
];

export const productOverviewData = [
  { name: 'Sent', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Lost', value: 100 },
];

export const recentAcquisitionsData = [
  { id: 1, title: 'Cyberpunk Art', author: 'NeoArt', price: '$250', condition: 'Mint', statusColor: 'green' },
  { id: 2, title: 'Synthwave Loop', author: 'VaporWave', price: '$80', condition: 'Used', statusColor: 'yellow' },
  { id: 3, title: 'Glitch Effect Pack', author: 'PixelGlitch', price: '$120', condition: 'Mint', statusColor: 'green' },
  { id: 4, title: 'Retro UI Kit', author: '80sDesign', price: '$300', condition: 'Damaged', statusColor: 'red' },
];

export const featuredItemsData = [
  { id: 1, title: 'Neon Cityscape', price: '$499', imageUrl: 'https://placehold.co/600x400/000000/34D399?text=Neon+City' },
  { id: 2, title: 'Abstract Orb', price: '$249', imageUrl: 'https://placehold.co/600x400/000000/C084FC?text=Abstract+Orb' },
  { id: 3, title: 'Holo-Interface', price: '$799', imageUrl: 'https://placehold.co/600x400/000000/60A5FA?text=Holo-UI' },
];

export const PIE_COLORS = ['#34D399', '#C084FC', '#60A5FA'];
