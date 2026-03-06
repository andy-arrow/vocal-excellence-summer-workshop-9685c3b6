
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * The tuition page is intentionally hidden from public navigation.
 * Pricing and payment details are shared with applicants on request.
 * Anyone who navigates directly to /tuition is quietly sent to /apply.
 */
const Tuition = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/apply', { replace: true });
  }, [navigate]);

  return null;
};

export default Tuition;
