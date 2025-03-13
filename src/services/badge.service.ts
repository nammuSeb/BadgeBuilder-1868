import axios from 'axios';
import { Badge, IssuedBadge } from '../types/badge';

const API_URL = import.meta.env.VITE_API_URL;

export const BadgeService = {
  async getUserBadges(): Promise<Badge[]> {
    const response = await axios.get(`${API_URL}/badges/user`);
    return response.data;
  },

  async getBadgeById(id: string): Promise<Badge> {
    const response = await axios.get(`${API_URL}/badges/${id}`);
    return response.data;
  },

  async shareBadge(badgeId: string, platform: string): Promise<IssuedBadge> {
    const response = await axios.post(`${API_URL}/badges/${badgeId}/share`, {
      platform
    });
    return response.data;
  },

  async verifyBadge(verificationCode: string): Promise<{
    isValid: boolean;
    badge?: Badge;
  }> {
    const response = await axios.get(
      `${API_URL}/badges/verify/${verificationCode}`
    );
    return response.data;
  }
};

export default BadgeService;