// Add to existing api.ts file

export const adminApi = {
  // Student Management
  getStudents: () => api.get('/admin/students'),
  getStudentById: (id: string) => api.get(`/admin/students/${id}`),
  createStudent: (data: any) => api.post('/admin/students', data),
  updateStudent: (id: string, data: any) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id: string) => api.delete(`/admin/students/${id}`),

  // Badge Management
  assignBadge: (studentId: string, badgeId: string) => 
    api.post('/admin/badges/assign', { studentId, badgeId }),
  revokeBadge: (studentId: string, badgeId: string) => 
    api.post('/admin/badges/revoke', { studentId, badgeId }),

  // Analytics
  getStatistics: () => api.get('/admin/statistics'),
  getBadgeIssuanceReport: () => api.get('/admin/reports/badge-issuance'),
};