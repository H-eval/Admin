// src/pages/PlaceholderPage.jsx
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/Card';

export const PlaceholderPage = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6"
  >
    <h1 className="text-3xl font-bold text-white">{title}</h1>
    <Card className="mt-6">
      <CardContent>
        <p className="text-gray-400">This is the {title} page. Content goes here.</p>
      </CardContent>
    </Card>
  </motion.div>
);
