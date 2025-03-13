import React from 'react';
import { motion } from 'framer-motion';
import BadgeGrid from '../../components/badges/BadgeGrid';
import { useBadges } from '../../hooks/useBadges';

const Dashboard: React.FC = () => {
  const { badges, isLoading, error, shareBadge } = useBadges();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading badges</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">My Badges</h1>
      <BadgeGrid 
        badges={badges} 
        onShare={(badgeId, platform) => shareBadge(badgeId, platform)} 
      />
    </motion.div>
  );
};

export default Dashboard;