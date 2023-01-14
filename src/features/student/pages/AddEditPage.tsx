import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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

  console.log('Found Student', student);

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
    </Box>
  );
}
