import * as React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import {
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
} from '@material-ui/system';

export interface WidgetProps {
  title: string;
  children: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const Box = styled.div<PaletteProps & SpacingProps & TypographyProps>`
  ${palette}${spacing}${typography}
`;

export function Widget({ title, children }: WidgetProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
