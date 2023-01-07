import { Grid, Box, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import * as React from 'react';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearch?: (newFilter: ListParams) => void;
}

export function StudentFilter(props: StudentFilterProps) {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput id="searchByName" label="Search by name" endAdornment={<Search />} />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
