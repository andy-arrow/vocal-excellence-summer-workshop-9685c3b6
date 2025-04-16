
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * This component is a simple redirect to the Index page.
 * It exists to maintain compatibility with the original import in App.tsx.
 */
const HomePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  
  return null;
};

export default HomePage;
