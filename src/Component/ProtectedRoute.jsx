import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../../utils/api'; // Tera api.js se

const ProtectedRoute = ({ requiredRole = 'admin', children }) => {
  const user = getUser(); // Tera api.js ka function

  // Check if user exists AND has correct role
  if (!user || user.role !== requiredRole) {
    return <Navigate to="/admin/login" replace />;
  }

  // Children ya nested routes render karo
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
