import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { authActions } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => dispatch(authActions.logout())}>
        Logout
      </Button>
      {/* <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/admin/*" element={<PrivateRoute childComp={<AdminLayout />} />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
