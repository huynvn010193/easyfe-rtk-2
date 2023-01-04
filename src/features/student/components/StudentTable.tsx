import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Paper } from '@material-ui/core';
import { Student } from 'models';

export interface StudentTableListProps {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

export function StudentTableList({ studentList, onEdit, onRemove }: StudentTableListProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.mark}</TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => onEdit?.(student)}
                  className={classes.edit}
                >
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => onRemove?.(student)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
