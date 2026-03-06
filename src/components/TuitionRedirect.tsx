
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TuitionRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/apply', { replace: true });
  }, [navigate]);
  
  return null;
};

export default TuitionRedirect;
