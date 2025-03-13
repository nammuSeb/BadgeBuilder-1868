import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  getStudents = async (req: Request, res: Response) => {
    try {
      const students = await this.adminService.getStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  };

  getStudentById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const student = await this.adminService.getStudentById(id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student' });
    }
  };

  createStudent = async (req: Request, res: Response) => {
    try {
      const student = await this.adminService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create student' });
    }
  };

  updateStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const student = await this.adminService.updateStudent(id, req.body);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update student' });
    }
  };

  deleteStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.adminService.deleteStudent(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete student' });
    }
  };

  assignBadge = async (req: Request, res: Response) => {
    try {
      const { studentId, badgeId } = req.body;
      await this.adminService.assignBadge(studentId, badgeId);
      res.status(201).json({ message: 'Badge assigned successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to assign badge' });
    }
  };

  getStatistics = async (req: Request, res: Response) => {
    try {
      const stats = await this.adminService.getStatistics();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  };
}