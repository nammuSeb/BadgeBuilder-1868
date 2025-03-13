import React from 'react';
import { motion } from 'framer-motion';
import BadgeCard from './BadgeCard';
import { Badge } from '../../types/badge';

interface BadgeGridProps {
  badges: Badge[];
  onShare: (badgeId: string, platform: string) => void;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, onShare }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {badges.map((badge) => (
        <BadgeCard
          key={badge.id}
          badge={badge}
          onShare={(platform) => onShare(badge.id, platform)}
        />
      ))}
    </motion.div>
  );
};

export default BadgeGrid;