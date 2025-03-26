
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800">
          Page Not Found
        </h1>
        <p className="text-gray-600 font-light mb-8">
          We couldn't find the page you were looking for. The page may have been moved or no longer exists.
        </p>
        <Link
          to="/"
          className="px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
