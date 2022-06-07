import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, redirectTo, loggedIn }) {
  return loggedIn ? children : <Navigate to={redirectTo} />;
};
