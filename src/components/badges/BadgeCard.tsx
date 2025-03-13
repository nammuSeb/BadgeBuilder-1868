import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../types/badge';
import { FaLinkedin, FaShare } from 'react-icons/fa';

interface BadgeCardProps {
  badge: Badge;
  onShare: (platform: string) => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onShare }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative">
        <img 
          src={badge.imageUrl} 
          alt={badge.title}
          className="w-full h-48 object-contain mb-4"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onShare('linkedin')}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            <FaLinkedin className="w-5 h-5" />
          </button>
          <button
            onClick={() => onShare('other')}
            className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700"
          >
            <FaShare className="w-5 h-5" />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{badge.title}</h3>
      <p className="text-gray-600 mb-4">{badge.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {badge.skills.map((skill, index) => (
          <span 
            key={index}
            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        <p>Issued: {new Date(badge.issuedDate).toLocaleDateString()}</p>
        {badge.expiryDate && (
          <p>Expires: {new Date(badge.expiryDate).toLocaleDateString()}</p>
        )}
      </div>
    </motion.div>
  );
};

export default BadgeCard;