import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute - Loading:', loading, 'User:', user); // Debug log

  // 1. Show spinner while Firebase checks auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // 2. If check is done AND no user is found, redirect to login
  if (!user) {
    console.log('PrivateRoute - No user found, redirecting to login'); // Debug log
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If check is done AND user is found, render the page
  return children;
};

export default PrivateRoute;