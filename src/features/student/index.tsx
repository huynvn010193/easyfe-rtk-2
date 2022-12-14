import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
} from '@material-ui/system';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { ListPage } from './pages/ListPage';
import { AddEditPage } from './pages/AddEditPage';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';

const Box = styled.div<PaletteProps & SpacingProps & TypographyProps>`
  ${palette}${spacing}${typography}
`;

export default function StudentFeature() {
  // Dùng match tận dụng lại nexted router . để không cần gõ lại đường dẫn cha: admin/students
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>

        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>

        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
}
