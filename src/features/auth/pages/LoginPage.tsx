import * as React from 'react';
import { Paper, makeStyles, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import {
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
} from '@material-ui/system';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';

const Box = styled.div<PaletteProps & SpacingProps & TypographyProps>`
  ${palette}${spacing}${typography}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    // TODO : Get username and pwd from Login Form
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Managemnet
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
