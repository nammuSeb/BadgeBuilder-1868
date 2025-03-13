import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = express.Router();
const adminController = new AdminController();

// Require authentication and admin role for all routes
router.use(authenticateToken, requireAdmin);

// Student Management
router.get('/students', adminController.getStudents);
router.get('/students/:id', adminController.getStudentById);
router.post('/students', adminController.createStudent);
router.put('/students/:id', adminController.updateStudent);
router.delete('/students/:id', adminController.deleteStudent);

// Badge Management
router.post('/badges/assign', adminController.assignBadge);
router.post('/badges/revoke', adminController.revokeBadge);

// Analytics
router.get('/statistics', adminController.getStatistics);
router.get('/reports/badge-issuance', adminController.getBadgeIssuanceReport);

export default router;