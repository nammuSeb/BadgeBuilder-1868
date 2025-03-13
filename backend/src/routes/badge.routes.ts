import express from 'express';
import { BadgeController } from '../controllers/badge.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();
const badgeController = new BadgeController();

// Public routes
router.get('/verify/:code', badgeController.verifyBadge);

// Protected routes
router.use(authenticateToken);

// Badge management
router.get('/', badgeController.getAllBadges);
router.get('/user', badgeController.getUserBadges);
router.get('/:id', badgeController.getBadgeById);
router.post('/', badgeController.createBadge);
router.put('/:id', badgeController.updateBadge);
router.delete('/:id', badgeController.deleteBadge);

// Badge operations
router.post('/issue', badgeController.issueBadge);
router.post('/:id/revoke', badgeController.revokeBadge);
router.post('/:id/share', badgeController.shareBadge);

export default router;