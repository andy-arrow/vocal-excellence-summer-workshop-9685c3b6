
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isAuthorizedAdmin } from '@/utils/accessControl';

// Memoize the component to prevent unnecessary re-renders
const AuthButtons = memo(() => {
  const { user, signOut } = useAuth();
  const isAdmin = user ? isAuthorizedAdmin(user.email) : false;

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {isAdmin && (
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-white/90 hover:text-white transition-colors flex items-center gap-1">
              <span className="hidden md:inline">Admin</span>
            </Link>
          </div>
        )}
        {/* Test page link is visible to all users */}
        <Link to="/test" className="text-white/90 hover:text-white transition-colors flex items-center gap-1">
          <Settings size={16} />
          <span className="hidden md:inline">Test</span>
        </Link>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Test page link visible for non-logged in users too */}
      <Link to="/test" className="text-white/90 hover:text-white transition-colors flex items-center gap-1">
        <Settings size={16} />
        <span className="hidden md:inline">Test</span>
      </Link>
      <Link to="/auth" className="text-white/90 hover:text-white transition-colors flex items-center gap-1">
        <LogIn size={16} />
        <span>Login</span>
      </Link>
    </div>
  );
});

// Add display name for better debugging
AuthButtons.displayName = 'AuthButtons';

export default AuthButtons;
