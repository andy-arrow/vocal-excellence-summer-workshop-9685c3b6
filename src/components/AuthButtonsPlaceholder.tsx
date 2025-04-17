
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

// A simplified version of AuthButtons that doesn't require authentication context
const AuthButtonsPlaceholder = memo(() => {
  return (
    <Link 
      to="/auth" 
      className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
    >
      <LogIn size={14} />
      <span>Sign In</span>
    </Link>
  );
});

// Add display name for better debugging
AuthButtonsPlaceholder.displayName = 'AuthButtonsPlaceholder';

export default AuthButtonsPlaceholder;
