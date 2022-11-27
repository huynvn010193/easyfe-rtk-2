import { Navigate } from 'react-router-dom';

export function PrivateRoute({ childComp }: any) {
  // Check if user is logged in
  // if yes , show route
  // Otherwise redirect to login page

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  if (!isLoggedIn) return <Navigate to="/login" />;

  return childComp;
}
