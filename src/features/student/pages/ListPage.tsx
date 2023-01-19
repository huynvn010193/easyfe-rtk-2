import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import {
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
} from '@material-ui/system';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { StudentFilter } from '../components/StudentFilter';
import { StudentTableList } from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

export interface AddEditPageProps {}

const Box = styled.div<PaletteProps & SpacingProps & TypographyProps>`
  ${palette}${spacing}${typography}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export function ListPage() {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const count = Math.ceil(pagination._totalRows / pagination._limit);

  useEffect(() => {
    // Khi filter thay đổi sẽ fetch action StudentList.
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    // Khi thay đổi trang -> cập nhât lại filter và student List . Khi filter thay đổi thì fetch lại List
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebouce(newFilter));
  };

  const handleFilterChage = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    console.log('Handle remove student', student);
    // call API trực tiếp
    try {
      await studentApi.remove(student?.id || '');

      toast.success('Remove student successfully');

      // re-fetch nhưng Giữ lại filter hiện tại. Giả bộ fetch lại student List. tạo ra tham chiếu mới để nhận bik.
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {}
  };

  const handleEditStudent = (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new Student
          </Button>
        </Link>
      </Box>

      {/* Filter  */}
      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChage}
        />
      </Box>

      {/* StudentTableList  */}
      <StudentTableList
        studentList={studentList}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleEditStudent}
      />

      {/* Pagination */}
      <Box my={2} className={classes.pagination}>
        <Pagination
          count={count}
          page={pagination._page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
