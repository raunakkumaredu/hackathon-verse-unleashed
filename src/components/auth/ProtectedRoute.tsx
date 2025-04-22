
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ["student", "company", "college", "mentor"] 
}) => {
  const { isAuthenticated, authState, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for role-based access
  if (authState.user && !allowedRoles.includes(authState.user.role)) {
    // Redirect to appropriate dashboard
    switch (authState.user.role) {
      case "student":
        return <Navigate to="/student-dashboard" replace />;
      case "company":
        return <Navigate to="/company-dashboard" replace />;
      case "college":
        return <Navigate to="/college-dashboard" replace />;
      case "mentor":
        return <Navigate to="/mentor-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
