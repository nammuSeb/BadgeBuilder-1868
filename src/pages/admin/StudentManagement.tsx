import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStudents } from '../../hooks/useStudents';
import StudentList from '../../components/admin/StudentList';
import StudentForm from '../../components/admin/StudentForm';

const StudentManagement: React.FC = () => {
  const { students, isLoading, error, createStudent, updateStudent, deleteStudent } = useStudents();
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleSubmit = async (studentData: any) => {
    if (selectedStudent) {
      await updateStudent(selectedStudent.id, studentData);
    } else {
      await createStudent(studentData);
    }
    setShowForm(false);
    setSelectedStudent(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add New Student
        </button>
      </div>

      {showForm && (
        <StudentForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedStudent(null);
          }}
          initialData={selectedStudent}
        />
      )}

      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={deleteStudent}
      />
    </motion.div>
  );
};

export default StudentManagement;