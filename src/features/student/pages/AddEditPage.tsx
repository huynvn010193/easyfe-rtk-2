import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export interface AddEditPageProps {}

export function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    // IF FREE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {}
    })();
  }, [studentId]);

  // nếu như student có giá trị sẽ overide lại hết còn ko thì lấy giá trị mặc định
  // khác phục cách khai báo string bị báo lỗi -> Ép kiểu về Student
  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleStudentFormSubmit = (formValues: Student) => {
    // TODO: Handle submit here
  };

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption">
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4" style={{ textDecoration: 'none' }}>
        {isEdit ? 'Update student Info' : 'Add new student'}
      </Typography>

      {/* Nếu trường hợp add thì hiện lên với giá trị mặc định, còn edit thì phải đợi API trả về student */}
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
