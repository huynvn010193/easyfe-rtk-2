import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@material-ui/core';
import { City, Student } from 'models';
import { capitalizeString, getMarkColor } from 'utils';

export interface StudentTableListProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

export function StudentTableList({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableListProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    // Set slelected student
    // Show confirm selected
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    // call  and wait onRemove
    // hide dialog
    onRemove?.(student);
    setOpen(false);
  };

  return (
    <>
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
            {studentList.map((student, idx) => {
              console.log('student', student);
              return (
                <TableRow key={student.id}>
                  <TableCell width={310}>{student.data?.id || student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{capitalizeString(student.data?.gender || student.gender)}</TableCell>
                  <TableCell>
                    <Box color={getMarkColor(student.data?.mark || student.mark)} fontWeight="bold">
                      {student.data?.mark || student.mark}
                    </Box>
                  </TableCell>
                  <TableCell>{cityMap[student.data?.city || student.city]?.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => onEdit?.(student)}
                      className={classes.edit}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleRemoveClick(student)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to remove student named "{selectedStudent?.name}".
          <br />
          This action can&apos; be undo
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
