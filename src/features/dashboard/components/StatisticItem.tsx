import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface StatisticProps {
  icon: React.ReactElement;
  label: string;
  value: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap', // Xếp theo chiều ngang và ko xuống dòng
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export function StatisticItem({ icon, label, value }: StatisticProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
