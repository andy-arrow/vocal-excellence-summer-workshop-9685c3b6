
/**
 * Access control utilities for the application
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// List of authorized administrator email addresses
export const AUTHORIZED_ADMIN_EMAILS = [
  'info@vocalexcellence.cy',
  'info@vocalexcellence.com.cy',
  'andreas@vocalexcellence.cy',
  'andreas@vocalexcellence.com.cy',
  'aroditis.andreas@gmail.com'
];

/**
 * Check if an email is authorized for admin access
 * @param email The email address to check
 * @returns Boolean indicating if the email is authorized
 */
export const isAuthorizedAdmin = (email: string | undefined | null): boolean => {
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Log access attempt to admin area
 * @param email Email used for the attempt
 * @param success Whether access was granted
 */
export const logAdminAccessAttempt = (email: string | undefined | null, success: boolean): void => {
  const timestamp = new Date().toISOString();
  const ipAddress = '(IP logging implemented server-side)'; // In production, this would be captured server-side
  
  // Log to console for development
  console.log(`[ADMIN ACCESS ATTEMPT] ${timestamp} | Email: ${email || 'none'} | Success: ${success} | IP: ${ipAddress}`);
  
  // In production, this would send the log to a secure storage system
  // This could be implemented with a Supabase edge function
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A route wrapper that only allows authenticated users to access the route
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

/**
 * A route wrapper that only allows authenticated administrators to access the route
 */
export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  const isAdmin = isAuthorizedAdmin(user.email);
  if (!isAdmin) {
    logAdminAccessAttempt(user.email, false);
    return <Navigate to="/" replace />;
  }
  
  logAdminAccessAttempt(user.email, true);
  return <>{children}</>;
};
