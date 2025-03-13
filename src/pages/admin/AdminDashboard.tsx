import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCertificate, FaChartBar } from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: FaUsers },
    { title: 'Active Certifications', value: '56', icon: FaCertificate },
    { title: 'Badges Issued', value: '2,891', icon: FaChartBar },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <stat.icon className="text-3xl text-blue-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;