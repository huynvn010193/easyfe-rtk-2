import * as React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import { Route, Switch } from 'react-router-dom';
import Doashboard from 'features/dashboard';
import StudentFeature from 'features/student';

export interface AdminLayoutProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr', // Header sẽ có giá trị auto, còn lại chiếm hết
    gridTemplateColumns: '240px 1fr', // Sidebar cố định 300 , còn lại thì chiếm hết
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

export function AdminLayout(props: AdminLayoutProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Doashboard />
          </Route>
          <Route path="/admin/students">
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
