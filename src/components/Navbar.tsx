
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import AuthButtons from './AuthButtons';
import { cn } from '@/lib/utils';

interface NavbarProps {
  activeSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/#about', label: 'About', id: 'about' },
    { href: '/#timeline', label: 'Timeline', id: 'timeline' },
    { href: '/#curriculum', label: 'Curriculum', id: 'curriculum' },
    { href: '/#instructors', label: 'Instructors', id: 'instructors' }
  ];

  return (
    <motion.nav
      className="bg-slate-900/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-sans text-xl font-semibold flex items-center">
          <span className="bg-gradient-to-r from-energy-purple to-energy-pink bg-clip-text text-transparent">
            Vocal Excellence Summer Programme
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              className={cn(
                "text-white/70 hover:text-white transition-colors relative py-2",
                activeSection === link.id ? "text-white" : ""
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-energy-pink to-energy-purple"
                  layoutId="navbar-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
          ))}
          <Link 
            to="/apply" 
            className="primary-button"
          >
            Apply Now
          </Link>
          <AuthButtons />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="bg-slate-900 md:hidden p-4 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              className={cn(
                "block py-3 text-white/90 hover:text-white transition-colors",
                activeSection === link.id ? "text-white font-medium" : ""
              )} 
              onClick={toggleMenu}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="ml-2 inline-block w-1 h-1 bg-energy-pink rounded-full" />
              )}
            </a>
          ))}
          <Link 
            to="/apply" 
            className="block py-3 mt-2 primary-button w-full text-center" 
            onClick={toggleMenu}
          >
            Apply Now
          </Link>
          <div className="py-3 border-t border-white/10 mt-3 flex">
            <AuthButtons />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
