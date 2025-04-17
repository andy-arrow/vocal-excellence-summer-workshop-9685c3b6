
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, Menu, Music, Users, Calendar, Sparkles } from 'lucide-react';
import AuthButtons from '@/components/AuthButtons';
import AuthButtonsPlaceholder from './AuthButtonsPlaceholder';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-slate-900/95 backdrop-blur-md shadow-md shadow-black/10 border-b border-violet-500/15" 
        : "bg-slate-900/70 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-outfit font-bold text-white tracking-tight hover:text-energy-purple/90 transition-colors flex items-center group"
        >
          <div className="mr-2 w-8 h-8 rounded-full bg-gradient-to-br from-energy-purple to-energy-pink flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
            <Music className="w-4 h-4" />
          </div>
          <span className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Vocal Excellence Summer Workshop
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'home' ? 'text-white' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, 'about')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'about' ? 'text-white' : ''}`}
          >
            <Music className="w-3.5 h-3.5" />
            About
          </a>
          <a
            href="#curriculum"
            onClick={(e) => handleSmoothScroll(e, 'curriculum')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'curriculum' ? 'text-white' : ''}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Curriculum
          </a>
          <a
            href="#instructors"
            onClick={(e) => handleSmoothScroll(e, 'instructors')}
            className={`text-white/85 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium ${activeSection === 'instructors' ? 'text-white' : ''}`}
          >
            <Users className="w-3.5 h-3.5" />
            Instructors
          </a>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full ${isActive 
                ? 'bg-energy-purple/90 text-white shadow-lg shadow-energy-purple/20' 
                : 'bg-white/10 hover:bg-white/20 text-white/85 hover:text-white'} transition-all text-sm font-medium`
            }
          >
            Apply Now
          </NavLink>
          
          {(() => {
            try {
              return <AuthButtons />;
            } catch (error) {
              return <AuthButtonsPlaceholder />;
            }
          })()}
        </div>

        <button 
          onClick={toggleMenu} 
          className="md:hidden text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu with improved animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="bg-slate-900/98 backdrop-blur-lg md:hidden fixed top-[73px] left-0 w-full border-b border-violet-500/15 shadow-lg shadow-black/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 py-6 px-6">
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                href="#home"
                onClick={(e) => handleSmoothScroll(e, 'home')}
                className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4" />
                Home
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href="#about"
                onClick={(e) => handleSmoothScroll(e, 'about')}
                className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/5"
              >
                <Music className="w-4 h-4" />
                About
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="#curriculum"
                onClick={(e) => handleSmoothScroll(e, 'curriculum')}
                className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/5"
              >
                <Calendar className="w-4 h-4" />
                Curriculum
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="#instructors"
                onClick={(e) => handleSmoothScroll(e, 'instructors')}
                className="text-white/90 hover:text-white transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/5"
              >
                <Users className="w-4 h-4" />
                Instructors
              </motion.a>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <NavLink
                  to="/apply"
                  className={({ isActive }) =>
                    `flex justify-center items-center w-full py-3 mt-2 rounded-xl ${
                      isActive 
                        ? 'bg-gradient-to-r from-energy-purple to-energy-pink text-white' 
                        : 'bg-white/10 text-white hover:bg-white/15'
                    } transition-all`
                  }
                  onClick={toggleMenu}
                >
                  Apply Now
                </NavLink>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-3 mt-2 border-t border-white/10"
              >
                <AuthButtonsPlaceholder />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
