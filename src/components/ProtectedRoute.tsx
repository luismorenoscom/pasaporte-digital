import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type UserRole = 'mercaderista' | 'supervisor' | 'tasker' | 'admin_agencia' | 'super_admin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  requirePermission?: string;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = ['mercaderista', 'supervisor', 'tasker', 'admin_agencia', 'super_admin'], 
  redirectTo = '/auth',
  requirePermission
}: ProtectedRouteProps) {
  const { user, currentUserRole, isInitialized, hasPermission } = useApp();

  // Mostrar loading mientras se inicializa
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    );
  }

  // Si no hay usuario logueado, redirigir a auth
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si hay roles específicos y el usuario no tiene el rol permitido
  if (allowedRoles.length > 0 && currentUserRole && !allowedRoles.includes(currentUserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si se requiere un permiso específico y el usuario no lo tiene
  if (requirePermission && !hasPermission(requirePermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
