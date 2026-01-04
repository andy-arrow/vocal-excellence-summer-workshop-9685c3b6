import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const AuthButtons = memo(() => {
  return (
    <div className="flex items-center gap-4">
      <Link 
        to="/admin" 
        className="text-apple-text/70 hover:text-apple-text transition-colors flex items-center gap-1"
        data-testid="link-admin"
      >
        <Settings size={16} />
        <span className="hidden md:inline">Admin</span>
      </Link>
    </div>
  );
});

AuthButtons.displayName = 'AuthButtons';

export default AuthButtons;
