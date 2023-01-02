import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { selectStudentList, studentActions } from '../studentSlice';
import {
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
} from '@material-ui/system';
import styled from 'styled-components';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { StudentTableList } from '../components/StudentTable';
export interface AddEditPageProps {}

const Box = styled.div<PaletteProps & SpacingProps & TypographyProps>`
  ${palette}${spacing}${typography}
`;

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
}));

export function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const studentList = useAppSelector(selectStudentList);

  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new Student
        </Button>
      </Box>
      {/* StudentTableList  */}
      <StudentTableList studentList={studentList} />
    </Box>
  );
}
