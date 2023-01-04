import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route path="/" exact>
          <Redirect to="/admin/dashboard" />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
