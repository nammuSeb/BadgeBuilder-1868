import { Request, Response } from 'express';
import { BadgeService } from '../services/badge.service';
import { createBadgeSchema } from '../validators/badge.validator';

export class BadgeController {
  private badgeService: BadgeService;

  constructor() {
    this.badgeService = new BadgeService();
  }

  getAllBadges = async (req: Request, res: Response) => {
    try {
      const badges = await this.badgeService.getAllBadges();
      res.json(badges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch badges' });
    }
  };

  getUserBadges = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const badges = await this.badgeService.getUserBadges(userId);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user badges' });
    }
  };

  createBadge = async (req: Request, res: Response) => {
    try {
      const validatedData = createBadgeSchema.parse(req.body);
      const badge = await this.badgeService.createBadge(validatedData);
      res.status(201).json(badge);
    } catch (error) {
      res.status(400).json({ error: 'Invalid badge data' });
    }
  };

  issueBadge = async (req: Request, res: Response) => {
    try {
      const { badgeId, userId } = req.body;
      const issuedBadge = await this.badgeService.issueBadge(badgeId, userId);
      res.status(201).json(issuedBadge);
    } catch (error) {
      res.status(400).json({ error: 'Failed to issue badge' });
    }
  };

  shareBadge = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { platform } = req.body;
      const userId = req.user.id;
      
      const result = await this.badgeService.shareBadge(id, userId, platform);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Failed to share badge' });
    }
  };

  verifyBadge = async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      const result = await this.badgeService.verifyBadge(code);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Invalid verification code' });
    }
  };
}