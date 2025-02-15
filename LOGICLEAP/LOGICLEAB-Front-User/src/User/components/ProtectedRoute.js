import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    // إعادة التوجيه إلى صفحة تسجيل الدخول مع حفظ المسار الحالي
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;