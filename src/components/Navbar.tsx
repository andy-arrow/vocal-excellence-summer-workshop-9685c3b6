
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className="bg-apple-dark fixed top-0 left-0 w-full z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-sans text-xl font-semibold">
          Vocal Excellence
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <a href="/#about" className="text-white/80 hover:text-white transition-colors">
            About
          </a>
          <a href="/#curriculum" className="text-white/80 hover:text-white transition-colors">
            Curriculum
          </a>
          <a href="/#instructors" className="text-white/80 hover:text-white transition-colors">
            Instructors
          </a>
          <Link to="/apply" className="primary-button">
            Apply Now
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="bg-apple-dark md:hidden p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="block py-2 text-white/80 hover:text-white transition-colors" onClick={toggleMenu}>
            Home
          </Link>
          <a href="/#about" className="block py-2 text-white/80 hover:text-white transition-colors" onClick={toggleMenu}>
            About
          </a>
          <a href="/#curriculum" className="block py-2 text-white/80 hover:text-white transition-colors" onClick={toggleMenu}>
            Curriculum
          </a>
          <a href="/#instructors" className="block py-2 text-white/80 hover:text-white transition-colors" onClick={toggleMenu}>
            Instructors
          </a>
          <Link to="/apply" className="block py-2 primary-button text-center" onClick={toggleMenu}>
            Apply Now
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
