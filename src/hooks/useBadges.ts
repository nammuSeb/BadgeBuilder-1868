import { useState, useEffect } from 'react';
import { Badge } from '../types/badge';
import BadgeService from '../services/badge.service';

export const useBadges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      setIsLoading(true);
      const data = await BadgeService.getUserBadges();
      setBadges(data);
    } catch (err) {
      setError('Failed to load badges');
    } finally {
      setIsLoading(false);
    }
  };

  const shareBadge = async (badgeId: string, platform: string) => {
    try {
      await BadgeService.shareBadge(badgeId, platform);
      // Reload badges to get updated share history
      await loadBadges();
    } catch (err) {
      setError('Failed to share badge');
    }
  };

  return {
    badges,
    isLoading,
    error,
    shareBadge,
    reloadBadges: loadBadges
  };
};

export default useBadges;