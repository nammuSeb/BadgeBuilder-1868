import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getStudents();
      setStudents(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const createStudent = async (studentData: any) => {
    try {
      await adminApi.createStudent(studentData);
      fetchStudents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateStudent = async (id: string, studentData: any) => {
    try {
      await adminApi.updateStudent(id, studentData);
      fetchStudents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await adminApi.deleteStudent(id);
      fetchStudents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    students,
    isLoading,
    error,
    createStudent,
    updateStudent,
    deleteStudent
  };
};

export default useStudents;